import React, { useState } from "react";
import API from "../services/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [msg, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await API.post("/auth/forgot-password", { email });
            setMessage(data.message);
            setError("");
        } catch (error) {
            console.error("Failed to send reset password link:", error);
            setError("Failed to send reset password link. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
            {msg && (
                <div className="text-green-500 bg-green-50 p-2 rounded-md flex items-center mb-4">
                    <span>✅</span>
                    <span className="ml-2">{msg}</span>
                </div>
            )}
            {error && (
                <div className="text-red-500 bg-red-50 p-2 rounded-md flex items-center mb-4">
                    <span>❌</span>
                    <span className="ml-2">{error}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Forgot Password Form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Email"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    aria-label="Send reset password link"
                >
                    {isLoading ? "Sending..." : "Send reset password link"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;