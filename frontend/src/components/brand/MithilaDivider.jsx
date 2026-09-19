/**
 * Mithila-inspired hand-drawn divider.
 * Pure SVG, zero external asset weight, honors currentColor.
 * variant: "row" (default, wide horizontal motif), "small" (single flourish)
 */
export default function MithilaDivider({ variant = "row", className = "", color = "currentColor" }) {
    if (variant === "small") {
        return (
            <svg
                viewBox="0 0 80 24"
                width="80"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                aria-hidden="true"
            >
                <path d="M0 12 L28 12" stroke={color} strokeWidth="0.8" />
                <path d="M52 12 L80 12" stroke={color} strokeWidth="0.8" />
                <circle cx="34" cy="12" r="1.2" fill={color} />
                <path d="M40 4 Q44 12 40 20 Q36 12 40 4 Z" stroke={color} strokeWidth="0.9" fill="none" />
                <circle cx="46" cy="12" r="1.2" fill={color} />
            </svg>
        );
    }
    // wide row — repeating fish + lotus + dot motif
    return (
        <svg
            viewBox="0 0 800 40"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <defs>
                <pattern id="mithila-motif" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
                    {/* base line */}
                    <line x1="0" y1="20" x2="120" y2="20" stroke={color} strokeWidth="0.6" opacity="0.5" />
                    {/* dot */}
                    <circle cx="8" cy="20" r="1.2" fill={color} />
                    {/* lotus petal */}
                    <path d="M22 20 Q26 10 30 20 Q26 30 22 20 Z" stroke={color} strokeWidth="0.8" fill="none" />
                    {/* fish */}
                    <path
                        d="M42 20 C46 12 56 12 60 20 C56 28 46 28 42 20 Z"
                        stroke={color}
                        strokeWidth="0.9"
                        fill="none"
                    />
                    <path d="M42 20 L36 15 L36 25 Z" stroke={color} strokeWidth="0.9" fill="none" />
                    <circle cx="55" cy="18" r="0.9" fill={color} />
                    {/* dot */}
                    <circle cx="72" cy="20" r="1.2" fill={color} />
                    {/* lotus */}
                    <path d="M86 20 Q90 10 94 20 Q90 30 86 20 Z" stroke={color} strokeWidth="0.8" fill="none" />
                    <circle cx="108" cy="20" r="1.2" fill={color} />
                </pattern>
            </defs>
            <rect x="0" y="0" width="800" height="40" fill="url(#mithila-motif)" />
        </svg>
    );
}
