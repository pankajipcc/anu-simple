import { Link } from "react-router-dom";

export default function ArtworkCard({ art, priority = false }) {
    const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: art.currency || "INR", maximumFractionDigits: 0 });
    return (
        <Link
            to={`/artwork/${art.slug}`}
            data-testid={`artwork-card-${art.slug}`}
            className="block group"
        >
            <div className="overflow-hidden bg-[#f7f3ea] border border-[#e5e0d8]">
                <img
                    src={art.image_url}
                    alt={art.title}
                    loading={priority ? "eager" : "lazy"}
                    className="w-full h-auto img-lift block"
                />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                    <h3 className="font-serif text-[22px] leading-tight tracking-tight">
                        {art.title}
                    </h3>
                    <p className="text-[12px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">
                        {art.category?.replace(/-/g, " ")} · {art.size}
                    </p>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-[13px] text-[#3b3532]">{art.price ? inr.format(art.price) : ""}</p>
                    {art.availability !== "available" && (
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#4a0e17] mt-1">
                            {art.availability}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
