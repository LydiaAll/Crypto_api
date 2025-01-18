import React, { useState, useEffect } from "react";
import API from "../services/api";

interface VerifyEmailResponse {
    message: string;
}

const VerifyEmail = () => {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const verifyEmail = async () => {
            const token = window.location.pathname.split("/").pop();
            if (!token) {
                setMessage("Invalid verification link.");
                return;
            }

            setLoading(true);
            try {
                const { data } = await API.post<VerifyEmailResponse>("/auth/verify-email", { token });
                setMessage(data.message);
            } catch (error: any) {
                setMessage(error.response?.data?.message || "Email verification failed.");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, []);

    return (
        <div className="max-w-md mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center">Verify Email</h1>
            {loading ? (
                <div className="text-center">Verifying...</div>
            ) : (
                message && <div className="text-center">{message}</div>
            )}
        </div>
    );
};

export default VerifyEmail;