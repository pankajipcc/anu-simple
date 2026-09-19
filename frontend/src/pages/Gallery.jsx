import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchArtworks, fetchCategories } from "@/lib/api";
import ArtworkCard from "@/components/site/ArtworkCard";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";

export default function Gallery() {
    const [params, setParams] = useSearchParams();
    const category = params.get("category") || "all";
    const q = params.get("q") || "";

    const [categories, setCategories] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(q);

    useEffect(() => {
        fetchCategories().then(setCategories).catch(() => {});
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchArtworks({ category, q })
            .then(setArtworks)
            .finally(() => setLoading(false));
    }, [category, q]);

    const filters = useMemo(() => [{ slug: "all", name: "All Works" }, ...categories], [categories]);

    const submitSearch = (e) => {
        e.preventDefault();
        const p = new URLSearchParams(params);
        if (query) p.set("q", query); else p.delete("q");
        setParams(p);
    };

    const setCategory = (slug) => {
        const p = new URLSearchParams(params);
        if (slug === "all") p.delete("category"); else p.set("category", slug);
        setParams(p);
    };

    return (
        <>
            <Seo title="Gallery · Anu Kalakriti" description="Browse hand-painted Madhubani, Mithila and Indian folk artworks." path="/gallery" />
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Gallery" }]} />

            <section className="container-editorial pt-6 pb-8">
                <div className="grid md:grid-cols-12 gap-8 items-end">
                    <div className="md:col-span-8">
                        <p className="eyebrow">The Collection</p>
                        <h1 className="headline headline-lg mt-4">Gallery of works.</h1>
                    </div>
                    <form onSubmit={submitSearch} className="md:col-span-4 flex items-center gap-2" data-testid="gallery-search-form">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7a726c] pointer-events-none" />
                            <input
                                data-testid="gallery-search-input"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search artworks…"
                                className="pill-input w-full pl-12"
                                aria-label="Search artworks"
                            />
                        </div>
                        <button className="btn-primary" data-testid="gallery-search-submit">Search</button>
                    </form>
                </div>
            </section>

            <section className="container-editorial pb-6">
                <div className="flex flex-wrap gap-3">
                    {filters.map((f) => (
                        <button
                            key={f.slug}
                            data-testid={`gallery-filter-${f.slug}`}
                            onClick={() => setCategory(f.slug)}
                            className={`text-[12px] uppercase tracking-[0.22em] px-5 py-2 rounded-full border transition-colors ${
                                category === f.slug
                                    ? "bg-[#1a1a1a] text-[#fdfbf7] border-[#1a1a1a]"
                                    : "bg-transparent text-[#1a1a1a] border-[#e5e0d8] hover:border-[#1a1a1a]"
                            }`}
                        >
                            {f.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="container-editorial py-10">
                {loading ? (
                    <div className="masonry">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-[#f3f0ea] h-72 border border-[#e5e0d8]" />
                        ))}
                    </div>
                ) : artworks.length === 0 ? (
                    <div data-testid="gallery-empty" className="py-20 text-center text-[#7a726c]">
                        No artworks match your filters.
                    </div>
                ) : (
                    <div className="masonry" data-testid="gallery-masonry">
                        {artworks.map((a) => (
                            <ArtworkCard key={a.id} art={a} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
