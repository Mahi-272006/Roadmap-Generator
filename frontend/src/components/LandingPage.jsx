import React from "react"
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            {/* Website Name */}
            <h1 className="text-5xl font-bold mb-4">AI Resume Builder</h1>

            {/* Motivational Quote */}
            <p className="text-xl mb-6">"Build your future, one resume at a time."</p>

            {/* Get Started Button */}
            <button
                className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-100 transition"
                onClick={() => navigate("/dashboard")}
            >
                Get Started
            </button>
        </div>
    );
}
export default LandingPage;