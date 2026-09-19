import { useEffect } from "react";

/**
 * Injects LocalBusiness JSON-LD into <head>.
 * Rendered from live site settings so admin edits stay in sync.
 */
export default function LocalBusinessJsonLd({ settings, url }) {
    useEffect(() => {
        if (!settings) return;
        const data = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": (url || window.location.origin) + "/#business",
            name: "Anu Kalakriti",
            description:
                settings.tagline ||
                "Original hand-painted Madhubani, Mithila and Indian folk artworks.",
            url: url || window.location.origin,
            image: (url || window.location.origin) + "/og-image.jpg",
            logo: (url || window.location.origin) + "/logo.png",
            email: settings.email,
            telephone: settings.phone,
            address: {
                "@type": "PostalAddress",
                streetAddress: "368B, 4th Floor, Street No. 12, West Guru Angad Nagar",
                addressLocality: "Laxmi Nagar",
                addressRegion: "Delhi",
                postalCode: "110092",
                addressCountry: "IN",
            },
            hasMap: settings.maps_url,
            geo: {
                "@type": "GeoCoordinates",
                latitude: 28.63873,
                longitude: 77.2817669,
            },
            sameAs: [settings.instagram, settings.facebook].filter(Boolean),
        };
        const id = "ld-local-business";
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement("script");
            el.type = "application/ld+json";
            el.id = id;
            document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(data);
        return () => {
            /* keep across route changes */
        };
    }, [settings, url]);
    return null;
}
