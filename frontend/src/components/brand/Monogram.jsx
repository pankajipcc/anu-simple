export default function Monogram({ size = 32, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M6 32 C10 18 22 14 32 14 C44 14 54 22 58 32 C54 42 44 50 32 50 C22 50 10 46 6 32 Z"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
            />
            <path d="M4 32 L10 26 L10 38 Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <circle cx="46" cy="28" r="1.8" fill="currentColor" />
            <path d="M22 32 Q28 26 34 32 Q40 38 34 32" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.7" />
            <path d="M18 24 Q20 22 22 24" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M18 40 Q20 42 22 40" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
    );
}
