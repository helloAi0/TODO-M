import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        // If valid, save login state
        localStorage.setItem("loggedIn", "true");
        navigate("/todo");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg">
                <h1 className="text-4xl font-bold mb-4">Login / Signup</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 rounded-xl text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded-xl text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
