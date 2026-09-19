import { Link } from "react-router-dom";

export default function ArtworkCard({ art, priority = false }) {
    const inr = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: art.currency || "INR",
        maximumFractionDigits: 0,
    });

    const isSixStories = Boolean(art.featured || art.six_stories);

    return (
        <Link
            to={`/artwork/${art.slug}`}
            data-testid={`artwork-card-${art.slug}`}
            className="block group relative"
        >
            {/* Image Container with Consistent Aspect Ratio */}
            <div className="relative overflow-hidden bg-[#f7f3ea] border border-[#e5e0d8] aspect-[4/5]">
                <img
                    src={art.image_url}
                    alt={art.title}
                    loading={priority ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 block"
                />

                {/* ── PHOTO TAG: Indicates Six Stories membership ── */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    {isSixStories ? (
                        <span
                            data-testid={`tag-six-stories-${art.slug}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold bg-[#4a0e17]/95 text-[#fdfbf7] border border-[#cba135]/60 backdrop-blur-sm shadow-md"
                        >
                            <span className="text-[#cba135]">✦</span> Six Stories
                        </span>
                    ) : (
                        <span
                            data-testid={`tag-collection-${art.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium bg-[#251d18]/80 text-[#e7ddd0] backdrop-blur-sm border border-[#e5e0d8]/20"
                        >
                            {art.category?.replace(/-/g, " ")}
                        </span>
                    )}
                </div>

                {/* ── HOVER BACKSTORY OVERLAY ── */}
                {art.story && (
                    <div
                        data-testid={`backstory-overlay-${art.slug}`}
                        className="absolute inset-0 z-20 p-5 md:p-6 flex flex-col justify-between bg-gradient-to-t from-[#18110e]/95 via-[#231a15]/92 to-[#2d1e18]/85 text-[#fdfbf7] opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]"
                    >
                        <div>
                            <div className="flex items-center justify-between pb-3 border-b border-[#cba135]/40">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#cba135] font-semibold flex items-center gap-1.5">
                                    <span>✦</span> The Backstory
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#f7f3ea]/60">
                                    {art.category?.replace(/-/g, " ")}
                                </span>
                            </div>

                            <p className="font-serif italic text-[13px] md:text-[14px] leading-relaxed text-[#f7f3ea] mt-4 line-clamp-6 text-left">
                                &ldquo;{art.story}&rdquo;
                            </p>
                        </div>

                        <div className="pt-3 border-t border-[#fdfbf7]/15 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#cba135]">
                            <span>Explore artwork & lore</span>
                            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Card Metadata */}
            <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                    <h3 className="font-serif text-[21px] leading-tight tracking-tight text-[#1a1a1a] group-hover:text-[#4a0e17] transition-colors">
                        {art.title}
                    </h3>
                    <p className="text-[12px] uppercase tracking-[0.22em] text-[#7a726c] mt-1.5 flex items-center gap-2">
                        <span>{art.category?.replace(/-/g, " ")}</span>
                        <span>·</span>
                        <span>{art.size}</span>
                    </p>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-[14px] font-serif text-[#3b3532]">
                        {art.price ? inr.format(art.price) : ""}
                    </p>
                    {art.availability !== "available" && (
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#4a0e17] mt-1 font-medium">
                            {art.availability}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
