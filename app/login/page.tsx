"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label className="label mt-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button className="btn btn-primary w-full mt-4">Login</button>
                    </form>

                    <p className="text-sm mt-2">
                        Don’t have an account? <a href="/signup" className="text-blue-500">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
