import { MessageCircle, Mail, Phone } from "lucide-react";
import { useSettings } from "@/lib/settings";

/**
 * Preview-mode notice shown wherever an interactive form used to be.
 * Renders the exact copy provided by the client and offers direct
 * phone / email / WhatsApp actions.
 */
export default function PreviewNotice({ testId = "preview-notice" }) {
    const { settings } = useSettings();
    const s = settings || {};
    const wa = (s.whatsapp_number || "").replace(/\D/g, "");
    const waHref = wa ? `https://wa.me/${wa}` : "#";
    const telHref = s.phone ? `tel:${s.phone.replace(/[^+\d]/g, "")}` : "#";
    const mailHref = s.email ? `mailto:${s.email}` : "#";

    return (
        <div
            data-testid={testId}
            className="border border-[#e5e0d8] bg-[#f7f3ea]/60 p-8 md:p-10 rounded-sm"
            role="note"
        >
            <p className="eyebrow">Preview mode</p>
            <p className="mt-4 font-serif text-2xl md:text-3xl leading-snug text-[#1a1a1a]">
                Thank you for visiting Anu Kalakriti.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[#3b3532] max-w-xl">
                This website is currently available for information and portfolio viewing only.
                If you would like to enquire about an artwork or commission, please contact us
                directly by Phone, Email or WhatsApp.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#7a726c] italic">
                Our complete interactive website will be launched soon.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
                {s.phone && (
                    <a
                        href={telHref}
                        data-testid={`${testId}-call`}
                        className="btn-outline"
                    >
                        <Phone size={15} /> Call us
                    </a>
                )}
                {s.email && (
                    <a
                        href={mailHref}
                        data-testid={`${testId}-email`}
                        className="btn-outline"
                    >
                        <Mail size={15} /> Email us
                    </a>
                )}
                {wa && (
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-testid={`${testId}-whatsapp`}
                        className="btn-primary bg-[#128C7E] border-[#128C7E] hover:bg-[#0e6d61]"
                    >
                        <MessageCircle size={15} /> WhatsApp
                    </a>
                )}
            </div>
        </div>
    );
}
