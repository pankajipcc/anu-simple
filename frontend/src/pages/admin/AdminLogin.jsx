import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginAdmin } from "@/lib/api";

export default function AdminLogin() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    if (localStorage.getItem("anu_admin_token")) return <Navigate to="/admin" replace />;

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        try {
            const data = await loginAdmin(email, password);
            localStorage.setItem("anu_admin_token", data.access_token);
            nav("/admin");
        } catch (e) {
            setErr(e?.response?.data?.detail || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] px-4">
            <div className="w-full max-w-md border border-[#e5e0d8] bg-white p-10">
                <p className="eyebrow">Admin</p>
                <h1 className="font-serif text-4xl mt-2">Sign in</h1>
                <form onSubmit={submit} className="mt-8 space-y-4" data-testid="admin-login-form">
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pill-input w-full" placeholder="Email" data-testid="admin-login-email" />
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pill-input w-full" placeholder="Password" data-testid="admin-login-password" />
                    {err && <p className="text-[13px] text-[#4a0e17]" data-testid="admin-login-error">{err}</p>}
                    <button disabled={loading} className="btn-primary w-full justify-center" data-testid="admin-login-submit">
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}
