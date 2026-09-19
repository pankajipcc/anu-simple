import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, MessageCircle, Mail, Ruler, Palette } from "lucide-react";
import { fetchArtwork } from "@/lib/api";
import { useSettings } from "@/lib/settings";
import ArtworkCard from "@/components/site/ArtworkCard";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";
import PreviewNotice from "@/components/site/PreviewNotice";

export default function ArtworkDetail() {
    const { slug } = useParams();
    const { settings } = useSettings();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoom, setZoom] = useState(false);
    const [pan, setPan] = useState({ x: 50, y: 50 });
    const primaryCtaRef = useRef(null);
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchArtwork(slug)
            .then(setData)
            .catch(() => setData(null))
            .finally(() => setLoading(false));
    }, [slug]);

    // Sticky enquire bar toggle (appears when user scrolls past ~450px)
    useEffect(() => {
        const onScroll = () => setShowSticky(window.scrollY > 480);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (loading) return <div className="container-editorial pt-40 py-20 text-[#7a726c]">Loading artwork…</div>;
    if (!data) return <div className="container-editorial pt-40 py-20">Artwork not found. <Link to="/gallery" className="link-underline">Back to gallery</Link></div>;

    const { artwork: art, related } = data;
    const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: art.currency || "INR", maximumFractionDigits: 0 });
    const wa = (settings?.whatsapp_number || "").replace(/\D/g, "");
    const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hi Anu, I'm interested in "${art.title}" (${inr.format(art.price)}). Is it still available?`)}` : "#";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: art.title,
        image: [art.image_url, ...(art.additional_images || [])],
        description: art.description,
        brand: { "@type": "Brand", name: "Anu Kalakriti" },
        offers: {
            "@type": "Offer",
            priceCurrency: art.currency || "INR",
            price: art.price,
            availability: art.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
    };

    return (
        <>
            <Seo title={`${art.title} · Anu Kalakriti`} description={art.description} image={art.image_url} path={`/artwork/${art.slug}`} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Gallery", to: "/gallery" }, { label: art.title }]} />

            <section className="container-editorial py-10 grid md:grid-cols-12 gap-10 md:gap-16">
                <div className="md:col-span-7">
                    <div
                        onClick={() => setZoom((z) => !z)}
                        onMouseMove={(e) => {
                            if (!zoom) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            setPan({ x, y });
                        }}
                        onMouseLeave={() => setPan({ x: 50, y: 50 })}
                        className="relative overflow-hidden border border-[#e5e0d8] bg-[#f7f3ea] cursor-zoom-in"
                        data-testid="artwork-main-image"
                        role="button"
                        aria-label={zoom ? "Click to reset zoom" : "Click to zoom the artwork"}
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setZoom((z) => !z)}
                    >
                        <img
                            src={art.image_url}
                            alt={art.title}
                            className={`w-full h-auto transition-transform duration-500 ${zoom ? "cursor-zoom-out" : ""}`}
                            style={{
                                transform: zoom ? "scale(2.1)" : "scale(1)",
                                transformOrigin: `${pan.x}% ${pan.y}%`,
                            }}
                            width="1200"
                            height="1500"
                        />
                        {!zoom && (
                            <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.24em] bg-[#fdfbf7]/85 backdrop-blur-sm px-3 py-1.5 border border-[#e5e0d8]">
                                Click to zoom
                            </span>
                        )}
                    </div>
                    {art.additional_images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {art.additional_images.map((u, i) => (
                                <img key={i} src={u} alt="" className="w-full h-24 object-cover border border-[#e5e0d8]" loading="lazy" />
                            ))}
                        </div>
                    )}
                </div>

                <div className="md:col-span-5">
                    <p className="eyebrow">{art.category?.replace(/-/g, " ")}</p>
                    <h1 className="headline headline-lg mt-3">{art.title}</h1>
                    <p className="mt-4 text-[22px] font-serif text-[#4a0e17]">{inr.format(art.price)}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.22em] text-[#7a726c]">
                        {art.availability === "available" ? "Available · Ships worldwide" : art.availability}
                    </p>

                    <div className="mt-8 divider" />
                    <dl className="mt-6 grid grid-cols-2 gap-y-4 text-[14px]">
                        <dt className="text-[#7a726c] flex items-center gap-2"><Palette size={14}/> Medium</dt><dd>{art.medium}</dd>
                        <dt className="text-[#7a726c] flex items-center gap-2"><Ruler size={14}/> Size</dt><dd>{art.size}</dd>
                        {art.year && (<><dt className="text-[#7a726c]">Year</dt><dd>{art.year}</dd></>)}
                        {art.certificate && (<><dt className="text-[#7a726c] flex items-center gap-2"><Award size={14}/> Certificate</dt><dd>Included</dd></>)}
                    </dl>
                    <div className="mt-8 divider" />

                    <p className="mt-6 text-[15px] leading-relaxed text-[#3b3532]">{art.description}</p>
                    {art.story && (
                        <p className="mt-4 text-[14px] leading-relaxed text-[#3b3532] italic">{art.story}</p>
                    )}

                    <div ref={primaryCtaRef} className="mt-10 flex flex-wrap gap-3">
                        <a href={waHref} target="_blank" rel="noreferrer" data-testid="artwork-whatsapp" className="btn-primary bg-[#128C7E] border-[#128C7E] hover:bg-[#0e6d61]">
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                        <a href="#enquiry" data-testid="artwork-enquire" className="btn-outline">
                            <Mail size={16} /> Enquire
                        </a>
                    </div>
                </div>
            </section>

            {/* Sticky enquire bar — appears after primary CTA scrolls out */}
            <div
                className={`sticky-enquire ${showSticky ? "is-visible" : ""}`}
                data-testid="sticky-enquire-bar"
                aria-hidden={!showSticky}
            >
                <div className="bg-[#fdfbf7]/95 backdrop-blur-md border border-[#e5e0d8] rounded-full px-4 py-2.5 flex items-center gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.10)] max-w-[92vw]">
                    <span className="hidden sm:flex items-center gap-3 pl-2 pr-1">
                        <img src={art.image_url} alt="" className="w-9 h-9 object-cover rounded-full" />
                        <div className="text-left leading-tight">
                            <p className="font-serif text-[15px] leading-none">{art.title}</p>
                            <p className="text-[11px] text-[#7a726c] mt-1">{inr.format(art.price)}</p>
                        </div>
                    </span>
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary bg-[#128C7E] border-[#128C7E] hover:bg-[#0e6d61] !py-2 !px-4 !text-[11px]"
                        data-testid="sticky-whatsapp"
                    >
                        <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a
                        href="#enquiry"
                        className="btn-primary !py-2 !px-4 !text-[11px]"
                        data-testid="sticky-enquire"
                    >
                        Enquire
                    </a>
                </div>
            </div>

            {/* enquiry */}
            <section id="enquiry" className="border-y border-[#e5e0d8] bg-[#f7f3ea]/50 py-20">
                <div className="container-editorial grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <p className="eyebrow">Buy · Enquire</p>
                        <h2 className="headline headline-md mt-3">
                            Interested in this piece? Write to Anu.
                        </h2>
                        <p className="mt-4 text-[14px] leading-relaxed text-[#3b3532]">
                            Every enquiry is read by the artist personally. Expect a response within 24–48 hours.
                        </p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="md:col-span-7" data-testid="artwork-enquiry-form" aria-hidden="true">
                        <PreviewNotice testId="artwork-preview-notice" />
                    </form>
                </div>
            </section>

            {related?.length > 0 && (
                <section className="container-editorial py-24">
                    <p className="eyebrow">You may also love</p>
                    <h2 className="headline headline-md mt-3 mb-12">Related works</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {related.map((a) => <ArtworkCard key={a.id} art={a} />)}
                    </div>
                </section>
            )}
        </>
    );
}
