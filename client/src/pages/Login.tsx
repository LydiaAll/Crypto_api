import React, { useState } from "react";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
    const { user, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await API.post("/auth/login", { email, password });
            login();
            localStorage.setItem("token", data.accessToken);
        } catch (error) {
            console.error("Login failed", error);
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-sm text-blue-500"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-500">
                Forgot password?
            </a>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;