import { useState } from "react";
import { MessageCircle, Mail, Phone, X, Sparkles, Send } from "lucide-react";
import { useSettings } from "@/lib/settings";

export default function AudienceConnectDock() {
    const { settings } = useSettings();
    const [open, setOpen] = useState(false);
    const [quickMsg, setQuickMsg] = useState("");
    const [senderName, setSenderName] = useState("");

    const s = settings || {};
    const wa = (s.whatsapp_number || "+919958652833").replace(/\D/g, "");
    const email = s.email || "help@anukalakriti.com";
    const phone = s.phone || "+91 99586 52833";

    const handleQuickWhatsApp = (e) => {
        e.preventDefault();
        const greeting = senderName ? `Namaste Anu, I am ${senderName}. ` : "Namaste Anu, ";
        const body = quickMsg || "I am visiting your website and would love to connect about your art.";
        const url = `https://wa.me/${wa}?text=${encodeURIComponent(greeting + body)}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setOpen(false);
    };

    const handleQuickEmail = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Message from ${senderName || "Website Visitor"}`);
        const body = encodeURIComponent(quickMsg || "Hi Anu,\n\nI was admiring your artwork on your portfolio...");
        window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
        setOpen(false);
    };

    return (
        <aside aria-label="Audience communication" className="fixed bottom-6 right-6 z-50">
            {/* Popover Panel */}
            {open && (
                <div
                    data-testid="connect-dock-modal"
                    className="mb-3 w-[330px] sm:w-[360px] bg-[#fdfbf7] border border-[#e5e0d8] shadow-[0_16px_40px_rgba(0,0,0,0.18)] p-5 rounded-none animate-in fade-in slide-in-from-bottom-3 duration-200"
                >
                    <div className="flex items-center justify-between pb-3 border-b border-[#e5e0d8]">
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-[#cba135]" />
                            <h3 className="font-serif text-[18px] text-[#4a0e17] font-medium m-0">
                                Connect with Anu
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-[#7a726c] hover:text-[#1a1a1a] p-1"
                            aria-label="Close message dock"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <p className="text-[13px] text-[#52463e] mt-3 leading-relaxed">
                        Have a question about a story, wish to commission an artwork, or want to say hello? Choose how you&rsquo;d like to talk:
                    </p>

                    {/* Fast Direct Action Links */}
                    <div className="mt-4 space-y-2">
                        {wa && (
                            <a
                                href={`https://wa.me/${wa}?text=${encodeURIComponent("Hi Anu, I am visiting your website and would love to connect.")}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                data-testid="dock-whatsapp-link"
                                className="flex items-center justify-between p-2.5 bg-[#128C7E]/10 hover:bg-[#128C7E]/20 text-[#128C7E] border border-[#128C7E]/30 text-[13px] font-medium transition-colors"
                            >
                                <span className="flex items-center gap-2.5">
                                    <MessageCircle size={16} /> Instant WhatsApp Chat
                                </span>
                                <span className="text-[11px] uppercase tracking-wider">Direct →</span>
                            </a>
                        )}

                        {email && (
                            <a
                                href={`mailto:${email}?subject=Enquiry%20for%20Anu%20Kalakriti`}
                                data-testid="dock-email-link"
                                className="flex items-center justify-between p-2.5 bg-[#faf7f2] hover:bg-[#f1ebe0] text-[#3b3532] border border-[#d9cebe] text-[13px] transition-colors"
                            >
                                <span className="flex items-center gap-2.5">
                                    <Mail size={16} className="text-[#4a0e17]" /> Send an Email
                                </span>
                                <span className="text-[11px] text-[#7a726c]">{email}</span>
                            </a>
                        )}

                        {phone && (
                            <a
                                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                                data-testid="dock-phone-link"
                                className="flex items-center justify-between p-2.5 bg-[#faf7f2] hover:bg-[#f1ebe0] text-[#3b3532] border border-[#d9cebe] text-[13px] transition-colors"
                            >
                                <span className="flex items-center gap-2.5">
                                    <Phone size={16} className="text-[#4a0e17]" /> Studio Call
                                </span>
                                <span className="text-[11px] text-[#7a726c]">{phone}</span>
                            </a>
                        )}
                    </div>

                    {/* Mini Quick Message Box */}
                    <form onSubmit={handleQuickWhatsApp} className="mt-4 pt-4 border-t border-[#e5e0d8]">
                        <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#52463e] mb-1">
                            Quick Message to Anu
                        </label>
                        <input
                            type="text"
                            placeholder="Your name..."
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            className="w-full bg-[#faf7f2] border border-[#d9cebe] px-3 py-1.5 text-[13px] text-[#1a1a1a] mb-2 focus:outline-none focus:border-[#4a0e17]"
                        />
                        <textarea
                            rows={2}
                            placeholder="Type a quick note..."
                            value={quickMsg}
                            onChange={(e) => setQuickMsg(e.target.value)}
                            className="w-full bg-[#faf7f2] border border-[#d9cebe] p-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#4a0e17] resize-none"
                        />
                        <div className="mt-2 flex gap-2">
                            <button
                                type="button"
                                onClick={handleQuickWhatsApp}
                                className="flex-1 bg-[#128C7E] hover:bg-[#0e6d61] text-white text-[12px] font-semibold py-2 px-3 flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <MessageCircle size={14} /> Send WhatsApp
                            </button>
                            <button
                                type="button"
                                onClick={handleQuickEmail}
                                className="bg-[#e7ddd0] hover:bg-[#d8c8b4] text-[#251d18] text-[12px] font-semibold py-2 px-3 flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <Mail size={14} /> Email
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                data-testid="audience-connect-trigger"
                aria-expanded={open}
                className="group flex items-center gap-2.5 bg-[#4a0e17] text-[#fdfbf7] border border-[#cba135]/60 px-4 py-3 shadow-[0_8px_25px_rgba(74,14,23,0.35)] hover:bg-[#380910] hover:shadow-[0_12px_32px_rgba(74,14,23,0.45)] transition-all duration-300 rounded-full"
            >
                <MessageCircle size={18} className="text-[#cba135] group-hover:scale-110 transition-transform" />
                <span className="text-[12px] uppercase tracking-[0.2em] font-semibold pr-1">
                    {open ? "Close" : "Talk with Anu"}
                </span>
            </button>
        </aside>
    );
}
