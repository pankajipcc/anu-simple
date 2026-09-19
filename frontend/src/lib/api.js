// ─── Static-file API (no backend / no database required) ─────────────────────
// All data is loaded from /public/data/*.json committed in this GitHub repo.
// To update artworks → edit public/data/artworks.json and push to GitHub.
// Vercel will auto-redeploy and the site will show your changes instantly.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function getJSON(filename) {
    const res = await fetch(`${BASE}/data/${filename}`);
    if (!res.ok) throw new Error(`Failed to load ${filename}`);
    return res.json();
}

// ── Public helpers ────────────────────────────────────────────────────────────

export async function fetchArtworks({ featured, category, q, limit } = {}) {
    let items = await getJSON("artworks.json");
    if (featured) items = items.filter((a) => a.featured || a.six_stories);
    if (category && category !== "all") items = items.filter((a) => a.category === category);
    if (q) {
        const lc = q.toLowerCase();
        items = items.filter(
            (a) =>
                a.title?.toLowerCase().includes(lc) ||
                a.description?.toLowerCase().includes(lc) ||
                a.category?.toLowerCase().includes(lc) ||
                a.story?.toLowerCase().includes(lc)
        );
    }
    items = items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    if (limit) items = items.slice(0, limit);
    return items;
}

export async function fetchArtwork(slug) {
    const artworks = await getJSON("artworks.json");
    const artwork = artworks.find((a) => a.slug === slug);
    if (!artwork) throw new Error("Not found");
    const related = artworks
        .filter((a) => a.category === artwork.category && a.id !== artwork.id)
        .slice(0, 4);
    return { artwork, related };
}

export async function fetchCategories() {
    const items = await getJSON("categories.json");
    return items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function fetchTestimonials() {
    return getJSON("testimonials.json");
}

export async function fetchSettings() {
    return getJSON("settings.json");
}

// Contact form — opens mailto so visitor can reach Anu directly
export async function createEnquiry(body) {
    const settings = await fetchSettings();
    const to = settings.email || "help@anukalakriti.com";
    const subject = encodeURIComponent(`Enquiry from ${body.name || "website"}`);
    const bodyText = encodeURIComponent(
        `Name: ${body.name || ""}\nEmail: ${body.email || ""}\nPhone: ${body.phone || ""}\n\n${body.message || ""}`
    );
    window.open(`mailto:${to}?subject=${subject}&body=${bodyText}`, "_blank");
    return { ok: true };
}

// ── Admin stubs (admin panel is not available in static mode) ─────────────────
const notAvailable = () => Promise.reject(new Error("Admin panel is not available in static mode."));
export const loginAdmin = notAvailable;
export const fetchMe = notAvailable;
export const adminArtworks    = { create: notAvailable, update: notAvailable, remove: notAvailable };
export const adminCategories  = { create: notAvailable, update: notAvailable, remove: notAvailable };
export const adminEnquiries   = { list: notAvailable, remove: notAvailable };
export const adminTestimonials = { create: notAvailable, update: notAvailable, remove: notAvailable };
export const adminSettings    = { update: notAvailable };
