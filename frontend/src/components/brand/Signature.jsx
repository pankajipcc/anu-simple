/**
 * Handwritten-feel signature using Caveat font.
 * Falls back gracefully — the font is loaded in index.html.
 */
export default function Signature({ className = "", size = "text-3xl" }) {
    return (
        <span
            className={`inline-block ${size} ${className}`}
            style={{ fontFamily: "Caveat, cursive", letterSpacing: "0.01em" }}
            aria-label="Anu, artist"
        >
            — Anu
        </span>
    );
}
