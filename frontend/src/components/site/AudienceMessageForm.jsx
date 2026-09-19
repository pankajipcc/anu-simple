import { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, Heart, Sparkles } from "lucide-react";
import { useSettings } from "@/lib/settings";

export default function AudienceMessageForm({ artwork = null, title = "Write to Anu", subtitle = "" }) {
    const { settings } = useSettings();
    const s = settings || {};

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        purpose: artwork ? `Inquiry about "${artwork.title}"` : "Appreciation & Note to Artist",
        message: artwork
            ? `Hi Anu, I am captivated by "${artwork.title}". I would love to learn more about its availability and delivery.`
            : "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [lastAction, setLastAction] = useState("");

    const waNumber = (s.whatsapp_number || "+919958652833").replace(/\D/g, "");
    const studioEmail = s.email || "help@anukalakriti.com";

    const composeMessageText = () => {
        let text = `Namaste Anu,\n\n`;
        text += `From: ${form.name || "A visitor"}\n`;
        if (form.email) text += `Email: ${form.email}\n`;
        if (form.phone) text += `Phone: ${form.phone}\n`;
        text += `Topic: ${form.purpose}\n\n`;
        if (artwork) {
            text += `Artwork: ${artwork.title} (₹${artwork.price?.toLocaleString("en-IN")})\n\n`;
        }
        text += `Message:\n${form.message}`;
        return text;
    };

    const handleSendWhatsApp = (e) => {
        e.preventDefault();
        if (!form.name || !form.message) {
            alert("Please provide your name and message.");
            return;
        }
        const text = composeMessageText();
        const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
        recordSubmission("WhatsApp");
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        if (!form.name || !form.message) {
            alert("Please provide your name and message.");
            return;
        }
        const text = composeMessageText();
        const subject = encodeURIComponent(
            artwork
                ? `Artwork Enquiry: ${artwork.title} — ${form.name}`
                : `Audience Note from ${form.name} (${form.purpose})`
        );
        const url = `mailto:${studioEmail}?subject=${subject}&body=${encodeURIComponent(text)}`;
        recordSubmission("Email");
        window.open(url, "_blank");
    };

    const handleDirectSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.message) {
            alert("Please fill in your name and message.");
            return;
        }
        recordSubmission("Direct Note");
    };

    const recordSubmission = (channel) => {
        try {
            const existing = JSON.parse(localStorage.getItem("anu_audience_messages") || "[]");
            existing.unshift({
                ...form,
                channel,
                timestamp: new Date().toISOString(),
            });
            localStorage.setItem("anu_audience_messages", JSON.stringify(existing.slice(0, 50)));
        } catch {}
        setLastAction(channel);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div
                data-testid="audience-message-success"
                className="border border-[#cba135]/50 bg-[#fdfbf7] p-8 md:p-10 shadow-sm relative overflow-hidden"
            >
                <div className="flex items-center gap-3 text-[#4a0e17] mb-4">
                    <CheckCircle2 size={24} className="text-[#128C7E]" />
                    <span className="eyebrow text-[#4a0e17]">Message Delivered</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] leading-tight">
                    Dhanyavaad, {form.name}.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3b3532] max-w-lg">
                    {lastAction === "WhatsApp"
                        ? "Your WhatsApp chat has opened. Anu reads and responds to each message with personal care."
                        : lastAction === "Email"
                        ? "Your email draft has been generated. Anu looks forward to connecting with you directly."
                        : "Your note has been received in the studio archive. Anu personally responds within 24–48 hours."}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            setSubmitted(false);
                            setForm({
                                name: "",
                                email: "",
                                phone: "",
                                purpose: "Appreciation & Note to Artist",
                                message: "",
                            });
                        }}
                        className="btn-outline text-[12px]"
                    >
                        Send another note
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            data-testid="audience-message-container"
            className="border border-[#e5e0d8] bg-[#fdfbf7] p-8 md:p-10 shadow-sm"
        >
            <div className="flex items-center gap-2 text-[#4a0e17] mb-2">
                <Sparkles size={16} className="text-[#cba135]" />
                <span className="eyebrow text-[#4a0e17]">Audience & Collectors</span>
            </div>
            <h2 className="headline headline-md mt-1">{title}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#7a726c] max-w-xl">
                {subtitle ||
                    "Whether you would like to commission a bespoke Mithila piece, ask about ancestral techniques, or simply share what these paintings stir in you — Anu warmly welcomes your message."}
            </p>

            <form onSubmit={handleDirectSubmit} className="mt-8 space-y-5" data-testid="audience-message-form">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#52463e] mb-1.5">
                            Your Name <span className="text-[#4a0e17]">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. Priya Sharma"
                            className="w-full bg-[#faf7f2] border border-[#d9cebe] focus:border-[#4a0e17] focus:outline-none px-4 py-2.5 text-[14px] text-[#1a1a1a]"
                            data-testid="audience-input-name"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#52463e] mb-1.5">
                            Email Address <span className="text-[#4a0e17]">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="e.g. priya@example.com"
                            className="w-full bg-[#faf7f2] border border-[#d9cebe] focus:border-[#4a0e17] focus:outline-none px-4 py-2.5 text-[14px] text-[#1a1a1a]"
                            data-testid="audience-input-email"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#52463e] mb-1.5">
                            Phone / WhatsApp (Optional)
                        </label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full bg-[#faf7f2] border border-[#d9cebe] focus:border-[#4a0e17] focus:outline-none px-4 py-2.5 text-[14px] text-[#1a1a1a]"
                            data-testid="audience-input-phone"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#52463e] mb-1.5">
                            Reason for Connecting
                        </label>
                        <select
                            value={form.purpose}
                            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                            className="w-full bg-[#faf7f2] border border-[#d9cebe] focus:border-[#4a0e17] focus:outline-none px-4 py-2.5 text-[14px] text-[#1a1a1a]"
                            data-testid="audience-select-purpose"
                        >
                            <option>Appreciation & Note to Artist</option>
                            <option>Custom Commission Enquiry</option>
                            <option>Artwork Purchase Enquiry</option>
                            <option>Exhibition & Gallery Invitation</option>
                            <option>General Greeting & Question</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#52463e] mb-1.5">
                        Your Message <span className="text-[#4a0e17]">*</span>
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Write your note, question, or commission vision here..."
                        className="w-full bg-[#faf7f2] border border-[#d9cebe] focus:border-[#4a0e17] focus:outline-none p-4 text-[14px] text-[#1a1a1a] leading-relaxed"
                        data-testid="audience-input-message"
                    />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Send on WhatsApp Button */}
                    <button
                        type="button"
                        onClick={handleSendWhatsApp}
                        data-testid="audience-btn-whatsapp"
                        className="btn-primary bg-[#128C7E] border-[#128C7E] hover:bg-[#0e6d61] flex items-center justify-center gap-2 !py-3 !px-5"
                    >
                        <MessageCircle size={17} /> Send via WhatsApp
                    </button>

                    {/* Send via Email Button */}
                    <button
                        type="button"
                        onClick={handleSendEmail}
                        data-testid="audience-btn-email"
                        className="btn-outline flex items-center justify-center gap-2 !py-3 !px-5"
                    >
                        <Mail size={17} /> Send via Email
                    </button>

                    {/* Save / Leave Note Button */}
                    <button
                        type="submit"
                        data-testid="audience-btn-submit"
                        className="btn-primary flex items-center justify-center gap-2 !py-3 !px-5 sm:ml-auto"
                    >
                        <Send size={15} /> Leave Note for Anu
                    </button>
                </div>

                <p className="text-[12px] text-[#7a726c] mt-3 italic text-center sm:text-left flex items-center gap-1.5">
                    <Heart size={12} className="text-[#4a0e17]" />
                    Anu reads and responds to every personal note from collectors and admirers.
                </p>
            </form>
        </div>
    );
}
