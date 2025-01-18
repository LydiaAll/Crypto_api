import React, { useState, useEffect } from "react";
import API from "../services/api";

interface WalletResponse {
    wallet: string;
}

const Profile = () => {
    const [wallet, setWallet] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWallet = async () => {
            setLoading(true);
            try {
                const { data } = await API.get<WalletResponse>("/profile/get_wallet");
                setWallet(data.wallet);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch wallet");
                setError("Failed to fetch wallet");
            } finally {
                setLoading(false);
            }
        };

        fetchWallet();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.put("/profile/update_wallet", { wallet });
            setError(null);
            // Optionally, show a success message
        } catch (error) {
            console.error("Failed to update wallet");
            setError("Failed to update wallet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Wallet"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
                >
                    {loading ? "Updating..." : "Update Wallet"}
                </button>
            </form>
        </div>
    );
};

export default Profile;