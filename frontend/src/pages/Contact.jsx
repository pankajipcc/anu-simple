import { MessageCircle, Mail, Phone, MapPin, Instagram, Navigation } from "lucide-react";
import { useSettings } from "@/lib/settings";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";
import LocalBusinessJsonLd from "@/components/site/LocalBusinessJsonLd";
import PreviewNotice from "@/components/site/PreviewNotice";

// Split the address string on commas into visual lines, trimming empties
function AddressLines({ address }) {
    if (!address) return null;
    const lines = address
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    return (
        <address className="not-italic text-[15px] leading-[1.7] text-[#3b3532]">
            {lines.map((l, i) => (
                <span key={i} className="block">{l}{i < lines.length - 1 ? "," : ""}</span>
            ))}
        </address>
    );
}

export default function Contact() {
    const { settings } = useSettings();
    const s = settings || {};

    const wa = (s.whatsapp_number || "").replace(/\D/g, "");
    const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent("Hi Anu, I have a question about your artwork.")}` : "#";
    // Exact studio coordinates resolved from the official Google Maps short URL
    // (https://maps.app.goo.gl/hBMJS1JEc4BeSNcn6). Hard-coded so the pin never
    // depends on geocoding of a free-form address string.
    const STUDIO_LAT = 28.63873;
    const STUDIO_LNG = 77.2817669;
    const mapEmbed = `https://www.google.com/maps?q=${STUDIO_LAT},${STUDIO_LNG}&ll=${STUDIO_LAT},${STUDIO_LNG}&z=17&output=embed`;
    const directionsUrl = s.maps_url || `https://www.google.com/maps/dir/?api=1&destination=${STUDIO_LAT},${STUDIO_LNG}`;
    const telHref = s.phone ? `tel:${s.phone.replace(/[^+\d]/g, "")}` : "#";
    const mailHref = s.email ? `mailto:${s.email}` : "#";

    return (
        <>
            <Seo title="Contact · Anu Kalakriti" description="Reach out to Anu for enquiries and commissions." path="/contact" />
            <LocalBusinessJsonLd settings={settings} />
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

            <section className="container-editorial py-10 grid md:grid-cols-12 gap-14">
                {/* LEFT — contact details */}
                <div className="md:col-span-5">
                    <p className="eyebrow">Write to us</p>
                    <h1 className="headline headline-lg mt-3">Every message is read.</h1>
                    <p className="mt-6 text-[15px] leading-relaxed text-[#3b3532] max-w-md">
                        Whether you&rsquo;d like to commission a piece, ask about a particular tradition, or simply say hello — Anu personally responds within 24&ndash;48 hours.
                    </p>

                    <div className="mt-10 space-y-8">
                        {/* Studio address */}
                        {s.address && (
                            <div>
                                <p className="eyebrow mb-3">Studio</p>
                                <div className="flex items-start gap-4">
                                    <MapPin size={18} className="mt-1 shrink-0 text-[#4a0e17]" />
                                    <div>
                                        <AddressLines address={s.address} />
                                        <a
                                            href={directionsUrl}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            data-testid="contact-directions"
                                            className="inline-flex items-center gap-2 mt-3 text-[12px] uppercase tracking-[0.22em] link-underline text-[#4a0e17]"
                                        >
                                            <Navigation size={13} /> Get directions
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact links */}
                        <div>
                            <p className="eyebrow mb-3">Reach us</p>
                            <ul className="space-y-3 text-[15px] text-[#3b3532]">
                                {s.email && (
                                    <li className="flex items-center gap-4">
                                        <Mail size={18} className="text-[#4a0e17]" />
                                        <a data-testid="contact-email-link" href={mailHref} className="link-underline">{s.email}</a>
                                    </li>
                                )}
                                {s.phone && (
                                    <li className="flex items-center gap-4">
                                        <Phone size={18} className="text-[#4a0e17]" />
                                        <a data-testid="contact-phone-link" href={telHref} className="link-underline">{s.phone}</a>
                                    </li>
                                )}
                                {s.instagram && (
                                    <li className="flex items-center gap-4">
                                        <Instagram size={18} className="text-[#4a0e17]" />
                                        <a href={s.instagram} target="_blank" rel="noreferrer noopener" className="link-underline">Instagram</a>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {wa && (
                            <a
                                href={waHref}
                                target="_blank"
                                rel="noreferrer noopener"
                                data-testid="contact-whatsapp"
                                className="btn-primary bg-[#128C7E] border-[#128C7E] hover:bg-[#0e6d61]"
                            >
                                <MessageCircle size={16} /> Chat on WhatsApp
                            </a>
                        )}
                    </div>
                </div>

                {/* RIGHT — preview mode notice (form disabled) */}
                <div className="md:col-span-7">
                    <PreviewNotice testId="contact-preview-notice" />
                </div>
            </section>

            {/* MAP */}
            <section className="border-t border-[#e5e0d8] mt-16">
                <div className="container-editorial pt-16">
                    <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                        <div>
                            <p className="eyebrow">Visit</p>
                            <h2 className="headline headline-md mt-3">Find the studio.</h2>
                        </div>
                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            data-testid="map-directions-btn"
                            className="btn-primary"
                        >
                            <Navigation size={16} /> Get directions
                        </a>
                    </div>

                    <div className="relative border border-[#e5e0d8] overflow-hidden bg-[#f7f3ea] aspect-[16/9] md:aspect-[21/9]">
                        <iframe
                            title="Anu Kalakriti studio — Google Maps"
                            src={mapEmbed}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            data-testid="contact-map-iframe"
                            style={{ border: 0, filter: "grayscale(15%) contrast(0.98)" }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
