import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, Sparkles, Truck, Feather } from "lucide-react";
import { fetchArtworks, fetchCategories, fetchTestimonials } from "@/lib/api";
import { useSettings } from "@/lib/settings";
import ArtworkCard from "@/components/site/ArtworkCard";
import Reveal from "@/components/site/Reveal";
import Seo from "@/components/site/Seo";
import MithilaDivider from "@/components/brand/MithilaDivider";
import Signature from "@/components/brand/Signature";
import Monogram from "@/components/brand/Monogram";

const CRAFT = [
    { icon: Feather, title: "Hand of the artist", copy: "Every line is drawn by Anu — no prints, no reproductions, no shortcuts." },
    { icon: Sparkles, title: "Earth pigments", copy: "Turmeric, indigo, hibiscus, geru and bark — the same palette Mithila women have used for centuries." },
    { icon: Award, title: "Signed & certified", copy: "Each piece is signed and travels with a certificate telling its story." },
    { icon: Truck, title: "Shipped with care", copy: "Rolled in acid-free paper, boxed and delivered to your door — anywhere in the world." },
];

export default function Home() {
    const { settings } = useSettings();
    const [featured, setFeatured] = useState([]);
    const [categories, setCategories] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetchArtworks({ featured: true, limit: 6 }).then(setFeatured).catch(() => {});
        fetchCategories().then(setCategories).catch(() => {});
        fetchTestimonials().then(setTestimonials).catch(() => {});
    }, []);

    const s = settings || {};

    return (
        <>
            <Seo
                title={s.site_title || "Anu Kalakriti — Madhubani & Mithila Folk Art"}
                description={s.tagline}
                image={s.hero_image}
                path="/"
            />

            {/* ────────────────────────── HERO ────────────────────────── */}
            <section data-testid="hero-section" className="pt-36 md:pt-40 pb-20 md:pb-28 relative overflow-hidden">
                <div className="container-editorial grid md:grid-cols-12 gap-10 md:gap-16 items-end relative">
                    <div className="md:col-span-6 md:pb-10 relative">
                        <div className="rise">
                            <span className="eyebrow">— A Living Folk Tradition</span>
                        </div>

                        <h1 className="headline headline-xl mt-8 rise rise-delay-1">
                            {(s.hero_heading || "Where every line\ntells a thousand-\nyear story.")
                                .split("\n")
                                .map((l, i) => (
                                    <span key={i} className="block">{l}</span>
                                ))}
                        </h1>

                        <div className="mt-8 flex items-baseline gap-3 rise rise-delay-2">
                            <span className="devanagari-note text-xl text-[#4a0e17]">मिथिला</span>
                            <span className="text-[#e5e0d8] text-lg">·</span>
                            <span className="devanagari-note text-xl text-[#4a0e17]">कला</span>
                            <span className="text-[#e5e0d8] text-lg">·</span>
                            <span className="devanagari-note text-xl text-[#4a0e17]">विरासत</span>
                        </div>

                        <p className="mt-8 max-w-md text-[16px] leading-relaxed text-[#3b3532] rise rise-delay-3">
                            {s.hero_subtext ||
                                "Original Madhubani & Mithila paintings by artist Anu, crafted with natural pigments on handmade paper — each piece a slow, quiet devotion."}
                        </p>

                        <div className="mt-10 flex items-center gap-6 rise rise-delay-4">
                            <Link to="/gallery" data-testid="hero-cta-gallery" className="btn-primary">
                                View the Gallery <ArrowUpRight size={16} />
                            </Link>
                            <Link
                                to="/about"
                                data-testid="hero-cta-about"
                                className="text-[13px] uppercase tracking-[0.22em] link-underline"
                            >
                                Meet the Artist
                            </Link>
                        </div>
                    </div>

                    <div className="md:col-span-6 relative rise rise-delay-2">
                        <div className="relative overflow-hidden bg-[#f7f3ea] border border-[#e5e0d8] aspect-[4/5]">
                            <img
                                src={s.hero_image}
                                alt="Featured Madhubani artwork — Fish of Prosperity"
                                className="absolute inset-0 w-full h-full object-cover img-lift"
                                loading="eager"
                                width="800"
                                height="1000"
                            />
                            {/* corner motif */}
                            <svg viewBox="0 0 60 60" className="absolute top-3 left-3 text-[#fdfbf7]/80" width="42" height="42" aria-hidden="true">
                                <path d="M4 30 Q30 4 56 30" stroke="currentColor" strokeWidth="1" fill="none" />
                                <path d="M4 30 Q30 56 56 30" stroke="currentColor" strokeWidth="1" fill="none" />
                                <circle cx="30" cy="30" r="2" fill="currentColor" />
                            </svg>
                        </div>

                        <figure className="absolute -bottom-6 -left-6 md:-left-10 bg-[#fdfbf7] border border-[#e5e0d8] px-6 py-5 max-w-xs shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
                            <p className="eyebrow">Featured · No. 01</p>
                            <p className="font-serif text-2xl mt-2 leading-tight">Fish of Prosperity</p>
                            <p className="text-[12px] text-[#7a726c] mt-1">Madhubani · 22 × 30 in</p>
                        </figure>
                    </div>
                </div>
            </section>

            {/* Mithila motif divider */}
            <div aria-hidden="true" className="container-editorial">
                <MithilaDivider className="text-[#b89b5e] opacity-70" />
            </div>

            {/* ────────────────────────── ARTIST WHISPER ────────────────────────── */}
            <section data-testid="artist-whisper" className="py-24 md:py-32">
                <div className="container-editorial max-w-4xl">
                    <Reveal className="text-center">
                        <p className="eyebrow">In her own words</p>
                        <blockquote className="font-serif italic text-[28px] md:text-[38px] leading-[1.2] tracking-tight text-[#1a1a1a] mt-8">
                            &ldquo;My grandmother would paint the walls before every wedding — cows,
                            fish, parrots appearing overnight in white lime and turmeric. When I paint,
                            I still hear her humming.&rdquo;
                        </blockquote>
                        <div className="mt-8 flex flex-col items-center gap-2">
                            <Signature className="text-[#4a0e17]" size="text-4xl" />
                            <span className="text-[11px] uppercase tracking-[0.32em] text-[#7a726c]">
                                Artist · Madhubani, Bihar
                            </span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ────────────────────────── CRAFT / WHY ────────────────────────── */}
            <section data-testid="why-section" className="border-y border-[#e5e0d8] bg-[#f7f3ea]/40">
                <div className="container-editorial py-20 md:py-24">
                    <div className="grid md:grid-cols-12 gap-10 mb-14">
                        <div className="md:col-span-5">
                            <p className="eyebrow">The Craft</p>
                            <h2 className="headline headline-lg mt-4">
                                Painted the old way.<br />Every piece.
                            </h2>
                        </div>
                        <p className="md:col-span-6 md:col-start-7 text-[15px] leading-relaxed text-[#3b3532] md:pt-6">
                            No factory. No press. No stencils. Just handmade paper stretched flat,
                            natural pigments ground fresh, and a bamboo pen dipped patiently — the
                            same way the women of Mithila have painted for over 2,500 years.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-10 md:gap-12">
                        {CRAFT.map((w, i) => (
                            <Reveal key={i} delay={i * 80} data-testid={`why-item-${i}`} className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-serif text-lg text-[#4a0e17]">
                                        0{i + 1}
                                    </span>
                                    <w.icon size={20} className="text-[#4a0e17]" strokeWidth={1.4} />
                                </div>
                                <h3 className="font-serif text-2xl leading-tight">{w.title}</h3>
                                <p className="text-[14px] leading-relaxed text-[#3b3532]">{w.copy}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────────── FEATURED / SIX STORIES ────────────────────────── */}
            <section data-testid="featured-section" className="py-24 md:py-32 bg-[#fdfbf7]">
                <div className="container-editorial">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <Reveal>
                            <p className="eyebrow">— The Signature Collection</p>
                            <h2 className="headline headline-lg mt-3">
                                Six pieces,<br />six stories.
                            </h2>
                            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#52463e]">
                                Each painting carries ancestral folklore, sacred wedding rites, and natural pigments. Hover over any piece to unveil its hidden backstory.
                            </p>
                        </Reveal>
                        <Reveal delay={100}>
                            <Link
                                to="/gallery"
                                data-testid="featured-view-all"
                                className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] link-underline pb-2 font-medium text-[#4a0e17]"
                            >
                                View full collection →
                            </Link>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {featured.slice(0, 6).map((a, i) => (
                            <Reveal key={a.id} delay={(i % 3) * 120}>
                                <div className="relative">
                                    <div className="flex items-baseline justify-between mb-3 px-1">
                                        <span className="handwritten text-2xl text-[#b89b5e]">
                                            Story &bull; {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] font-medium">
                                            {a.category?.replace(/-/g, " ")}
                                        </span>
                                    </div>
                                    <ArtworkCard art={a} priority={i < 3} />
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="mt-16 md:hidden text-center">
                        <Link to="/gallery" className="btn-outline">View the full gallery</Link>
                    </div>
                </div>
            </section>

            {/* Mithila motif divider */}
            <div aria-hidden="true" className="container-editorial">
                <MithilaDivider className="text-[#b89b5e] opacity-70" />
            </div>

            {/* ────────────────────────── ABOUT SPLIT ────────────────────────── */}
            <section data-testid="about-teaser" className="py-24 md:py-32">
                <div className="container-editorial grid md:grid-cols-12 gap-12 md:gap-20 items-center">
                    <Reveal className="md:col-span-5 md:order-2">
                        <div className="relative">
                            <div className="overflow-hidden bg-[#f7f3ea] border border-[#e5e0d8] aspect-[4/5]">
                                <img
                                    src={s.artist_image}
                                    alt="The artist Anu in her studio"
                                    className="w-full h-full object-cover img-lift"
                                    loading="lazy"
                                    width="600"
                                    height="750"
                                />
                            </div>
                            <div className="absolute -bottom-5 -right-5 bg-[#4a0e17] text-[#fdfbf7] px-5 py-3 rotate-[-4deg]">
                                <span className="handwritten text-2xl">since childhood</span>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={120} className="md:col-span-7 md:order-1">
                        <p className="eyebrow">About the Artist</p>
                        <h2 className="headline headline-lg mt-4">
                            A quiet devotion to<br />the lines of Mithila.
                        </h2>
                        <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-[#3b3532]">
                            {s.about_short ||
                                "Anu is a self-taught Madhubani artist from Bihar, dedicated to keeping the Mithila tradition alive through contemporary storytelling."}
                        </p>
                        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#3b3532] italic">
                            &ldquo;I don&rsquo;t finish a painting. I live with it until it&rsquo;s ready to leave.&rdquo;
                        </p>

                        <div className="mt-10 grid grid-cols-3 gap-8 max-w-md">
                            <div>
                                <p className="font-serif text-4xl text-[#4a0e17]">15+</p>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">Years painting</p>
                            </div>
                            <div>
                                <p className="font-serif text-4xl text-[#4a0e17]">200+</p>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">Works sold</p>
                            </div>
                            <div>
                                <p className="font-serif text-4xl text-[#4a0e17]">18</p>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">Countries</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link data-testid="about-teaser-cta" to="/about" className="btn-outline">
                                Read her full story
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ────────────────────────── CATEGORIES ────────────────────────── */}
            <section data-testid="categories-section" className="py-24 md:py-28 bg-[#f7f3ea]/60 border-y border-[#e5e0d8]">
                <div className="container-editorial">
                    <div className="max-w-2xl mb-16">
                        <p className="eyebrow">Traditions we honor</p>
                        <h2 className="headline headline-lg mt-4">Four schools,<br />one heritage.</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((c, i) => (
                            <Reveal key={c.id} delay={i * 80}>
                                <Link
                                    to={`/gallery?category=${c.slug}`}
                                    data-testid={`category-tile-${c.slug}`}
                                    className="group border border-[#e5e0d8] bg-[#fdfbf7] p-8 hover:bg-[#4a0e17] hover:text-[#fdfbf7] transition-colors duration-500 min-h-[240px] flex flex-col justify-between relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="eyebrow group-hover:text-[#cba135] transition-colors">
                                            No. {String(c.order || i + 1).padStart(2, "0")}
                                        </span>
                                        <Monogram size={22} className="opacity-30 group-hover:opacity-60 group-hover:text-[#cba135] transition-opacity" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-3xl leading-tight">{c.name}</h3>
                                        <p className="mt-3 text-[13px] leading-relaxed opacity-80">{c.description}</p>
                                        <div className="mt-6 text-[11px] uppercase tracking-[0.28em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                            Browse works →
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────────── TESTIMONIALS ────────────────────────── */}
            {testimonials.length > 0 && (
                <section data-testid="testimonials-section" className="py-24 md:py-32">
                    <div className="container-editorial">
                        <Reveal className="text-center max-w-2xl mx-auto">
                            <p className="eyebrow">Kind words</p>
                            <h2 className="headline headline-lg mt-4">
                                Homes across<br />eighteen countries.
                            </h2>
                        </Reveal>
                        <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-14">
                            {testimonials.map((t, i) => (
                                <Reveal key={t.id} delay={i * 100} data-testid={`testimonial-${t.id}`}>
                                    <figure className="border-t border-[#e5e0d8] pt-8">
                                        <div className="flex gap-1 text-[#cba135] mb-4">
                                            {Array.from({ length: t.rating || 5 }).map((_, k) => (
                                                <span key={k} className="text-[13px]">✦</span>
                                            ))}
                                        </div>
                                        <blockquote className="font-serif text-[22px] leading-snug tracking-tight text-[#1a1a1a]">
                                            &ldquo;{t.quote}&rdquo;
                                        </blockquote>
                                        <figcaption className="mt-8">
                                            <p className="text-[14px] font-medium">{t.name}</p>
                                            <p className="text-[12px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">{t.location}</p>
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ────────────────────────── CONTACT CTA ────────────────────────── */}
            <section data-testid="contact-cta" className="py-24 md:py-32 bg-[#4a0e17] text-[#fdfbf7] relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 opacity-20">
                    <MithilaDivider color="#cba135" />
                </div>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 opacity-20 rotate-180">
                    <MithilaDivider color="#cba135" />
                </div>
                <div className="container-editorial grid md:grid-cols-12 gap-10 items-center relative">
                    <div className="md:col-span-8">
                        <p className="eyebrow text-[#cba135]">Enquire</p>
                        <h2 className="headline headline-lg mt-4 text-[#fdfbf7]">
                            Commission a piece,<br />or take one home.
                        </h2>
                        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#f7f3ea]/85">
                            Every artwork can be personalised. Reach out to Anu directly — she reads
                            and replies to every enquiry, often within a day.
                        </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end justify-center">
                        <Link
                            data-testid="contact-cta-btn"
                            to="/contact"
                            className="btn-outline btn-outline-ivory text-center"
                        >
                            Start a conversation
                        </Link>
                        {s.whatsapp_number && (
                            <a
                                href={`https://wa.me/${s.whatsapp_number.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Anu, I am visiting your website and would love to connect about your art.")}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                data-testid="home-whatsapp-cta"
                                className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0e6d61] text-white px-5 py-3 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors"
                            >
                                WhatsApp Anu Directly
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
