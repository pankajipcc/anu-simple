/**
 * Official Anu Kalakriti wordmark.
 * Uses responsive srcset so browsers pull the smallest sufficient asset.
 * Source PNG is transparent — no distortion, no recolor, preserved proportions.
 *
 * Native aspect ratio: 921 × 337  → 2.7329 : 1
 */
const ASPECT = 921 / 337;

export default function BrandLogo({ height = 44, className = "", priority = false, alt = "Anu Kalakriti — Handmade Art & Paintings" }) {
    const width = Math.round(height * ASPECT);
    return (
        <img
            src="/logo-200.png"
            srcSet="/logo-100.png 1x, /logo-200.png 2x, /logo-400.png 4x"
            sizes={`${width}px`}
            width={width}
            height={height}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={priority ? "high" : "auto"}
            className={className}
            style={{ height: `${height}px`, width: "auto" }}
        />
    );
}
