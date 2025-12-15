import { useNavigate } from "react-router-dom";

export default function Intro() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg">
                <h1 className="text-4xl font-bold mb-4">Welcome to TODO-M</h1>
                <p className="mb-6 text-lg opacity-90">
                    Organize tasks. Track time. Stay focused.
                </p>

                <button
                    onClick={() => navigate("/auth")}
                    className="px-8 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
                >
                    Get Started →
                </button>
            </div>
        </div>
    );
}
