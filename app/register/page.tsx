"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed");
                return;
            }

            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => router.push("/login"), 2000);
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Register</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label className="label mt-2">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <label className="label mt-2">Confirm Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button className="btn btn-primary w-full mt-4">Register</button>
                    </form>

                    <p className="text-sm mt-2">
                        Already have an account? <a href="/login" className="text-blue-500">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
