import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
    return (
        <nav aria-label="Breadcrumb" data-testid="breadcrumbs" className="container-editorial pt-28 pb-2">
            <ol className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#7a726c]">
                {items.map((it, i) => (
                    <li key={i} className="flex items-center gap-2">
                        {i > 0 && <ChevronRight size={12} className="opacity-60" />}
                        {it.to ? (
                            <Link to={it.to} className="link-underline">{it.label}</Link>
                        ) : (
                            <span className="text-[#1a1a1a]">{it.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
