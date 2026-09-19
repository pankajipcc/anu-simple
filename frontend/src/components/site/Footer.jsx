import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/settings";
import BrandLogo from "@/components/brand/BrandLogo";
import MithilaDivider from "@/components/brand/MithilaDivider";

export default function Footer() {
    const { settings } = useSettings();
    const s = settings || {};
    return (
        <footer data-testid="site-footer" className="mt-32 border-t border-[#e5e0d8] bg-[#fdfbf7]">
            <div aria-hidden="true" className="container-editorial pt-8">
                <MithilaDivider className="text-[#b89b5e] opacity-60" />
            </div>
            <div className="container-editorial py-16 grid md:grid-cols-12 gap-14">
                <div className="md:col-span-5">
                    <Link to="/" aria-label="Anu Kalakriti — Home" className="inline-block mb-6">
                        <BrandLogo height={80} alt="Anu Kalakriti" />
                    </Link>
                    <p className="max-w-md text-[15px] leading-relaxed text-[#3b3532]">
                        A living archive of Madhubani and Mithila art — hand-painted, one story at a time, from Bihar to the world.
                    </p>
                </div>
                <div className="md:col-span-3">
                    <p className="eyebrow mb-5">Explore</p>
                    <ul className="space-y-3 text-[14px]">
                        <li><Link data-testid="footer-link-gallery" to="/gallery" className="link-underline">Gallery</Link></li>
                        <li><Link data-testid="footer-link-about" to="/about" className="link-underline">About the Artist</Link></li>
                        <li><Link data-testid="footer-link-contact" to="/contact" className="link-underline">Contact</Link></li>
                        <li><Link data-testid="footer-link-admin" to="/admin/login" className="link-underline text-[#7a726c]">Admin</Link></li>
                    </ul>
                </div>
                <div className="md:col-span-4">
                    <p className="eyebrow mb-5">Studio</p>
                    <ul className="space-y-4 text-[14px] text-[#3b3532]">
                        {s.address && (
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-1 shrink-0 text-[#4a0e17]" />
                                <address className="not-italic leading-relaxed">
                                    {s.address.split(",").map((l, i, arr) => (
                                        <span key={i} className="block">
                                            {l.trim()}{i < arr.length - 1 ? "," : ""}
                                        </span>
                                    ))}
                                </address>
                            </li>
                        )}
                        {s.email && (
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="mt-1 shrink-0 text-[#4a0e17]" />
                                <a data-testid="footer-email" href={`mailto:${s.email}`} className="link-underline">{s.email}</a>
                            </li>
                        )}
                        {s.phone && (
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="mt-1 shrink-0 text-[#4a0e17]" />
                                <a data-testid="footer-phone" href={`tel:${s.phone.replace(/[^+\d]/g, "")}`} className="link-underline">{s.phone}</a>
                            </li>
                        )}
                        {s.whatsapp_number && (
                            <li className="flex items-start gap-3">
                                <MessageCircle size={16} className="mt-1 shrink-0 text-[#128C7E]" />
                                <a
                                    data-testid="footer-whatsapp"
                                    href={`https://wa.me/${s.whatsapp_number.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="link-underline"
                                >
                                    WhatsApp chat
                                </a>
                            </li>
                        )}
                        {s.instagram && (
                            <li className="flex items-start gap-3">
                                <Instagram size={16} className="mt-1 shrink-0 text-[#4a0e17]" />
                                <a href={s.instagram} target="_blank" rel="noreferrer noopener" className="link-underline">Instagram</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="border-t border-[#e5e0d8]">
                <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] uppercase tracking-[0.22em] text-[#7a726c]">
                    <span>© {new Date().getFullYear()} Anu Kalakriti — All rights reserved</span>
                    <span>Handcrafted in India · Sent worldwide</span>
                </div>
                <div className="container-editorial pb-6" data-testid="footer-preview-notice">
                    <p className="text-[11px] leading-relaxed text-[#7a726c] italic text-center md:text-left">
                        Preview Version — This website is currently under development. Some interactive features are temporarily unavailable.
                    </p>
                </div>
            </div>
        </footer>
    );
}
