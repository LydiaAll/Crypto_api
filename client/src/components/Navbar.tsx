import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import API from "services/api";

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await API.delete("/auth/logout");
        logout();
        localStorage.removeItem("token");
    }

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <Link to="/" className="font-bold text-lg">My App</Link>
            <div>
                {user ? (
                    <>
                        <Link to="/dashboard" className="mr-4">Dashboard</Link>
                        <Link to="/profile" className="mr-4">Profile</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4">Login</Link>
                        <Link to="/register" className="bg-blue-500 px-4 py-2 rounded">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
