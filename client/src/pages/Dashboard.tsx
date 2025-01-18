import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import API from "services/api";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface PriceEvolution {
    date: string;
    price: number;
}

const isValidData = (data: any): data is PriceEvolution[] => {
    return Array.isArray(data) && data.every(
        (entry) => entry.date && typeof entry.price === "number"
    );
};

const Dashboard = () => {
    const [data, setData] = useState<PriceEvolution[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await API.get("/wallet/get_data");
                if (isValidData(response.data)) {
                    setData(response.data);
                    setError(null);
                } else {
                    throw new Error("Invalid data format received from the API.");
                }
            } catch (err: any) {
                console.error("Failed to fetch data:", err);
                setError(err.message || "Failed to fetch data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: data.map((entry) => entry.date),
        datasets: [
            {
                label: "Crypto Wallet Price Evolution",
                data: data.map((entry) => entry.price),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: "Crypto Wallet Price Evolution",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Price",
                },
                beginAtZero: false,
            },
        },
    };

    return (
        <div style={{ padding: "2rem" }} className="bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Crypto Wallet</h1>
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!isLoading && !error && data.length > 0 && (
                <div
                    role="graphics-document"
                    aria-label="Crypto Wallet Price Evolution Chart"
                    className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
                >
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
            {!isLoading && !error && data.length === 0 && (
                <p className="text-center text-gray-500">No data available.</p>
            )}
        </div>
    );
};

export default Dashboard;