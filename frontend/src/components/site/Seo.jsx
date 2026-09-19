import { useEffect } from "react";

export default function Seo({ title, description, image, path }) {
    useEffect(() => {
        if (title) document.title = title;
        const set = (name, content, prop = false) => {
            if (!content) return;
            const attr = prop ? "property" : "name";
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };
        set("description", description);
        set("og:title", title, true);
        set("og:description", description, true);
        set("og:image", image, true);
        set("og:type", "website", true);
        // canonical
        if (path) {
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement("link");
                link.setAttribute("rel", "canonical");
                document.head.appendChild(link);
            }
            link.setAttribute("href", window.location.origin + path);
        }
    }, [title, description, image, path]);
    return null;
}
