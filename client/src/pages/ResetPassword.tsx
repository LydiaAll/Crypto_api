import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase || !hasLowerCase) {
            return "Password must contain both uppercase and lowercase letters.";
        }
        if (!hasNumber) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Password validation
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setErrors(passwordError);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const { password } = formData;
            const token = window.location.pathname.split("/").pop();
            await API.post("/auth/reset-password", { password, token });
            navigate("/login");
        } catch (error: any) {
            console.error("Reset password failed:", error);
            setErrors(
                error.response?.data?.message ||
                "Failed to reset password. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
            {errors && (
                <div className="text-red-500 bg-red-50 p-2 rounded-md mb-4">
                    {errors}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Reset Password Form">
                <div>
                    <label htmlFor="password" className="block font-medium mb-1">
                        New password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        aria-label="New Password"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block font-medium mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm your password"
                        aria-label="Confirm Password"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    aria-label="Reset Password"
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;