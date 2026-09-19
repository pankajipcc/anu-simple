import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const NAV = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="site-header"
            className="fixed top-0 inset-x-0 z-50 transition-all duration-500 backdrop-blur-xl bg-[#fdfbf7]/95 border-b border-[#e5e0d8]"
        >
            <div className="container-editorial flex items-center justify-between h-[80px] md:h-[84px]">
                <Link
                    to="/"
                    data-testid="header-logo-link"
                    aria-label="Anu Kalakriti — Home"
                    className="flex items-center"
                >
                    <BrandLogo height={48} priority className="md:hidden" />
                    <BrandLogo height={56} priority className="hidden md:block" />
                </Link>

                <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
                    {NAV.map((n) => (
                        <NavLink
                            key={n.to}
                            to={n.to}
                            data-testid={`nav-link-${n.label.toLowerCase()}`}
                            end={n.to === "/"}
                            className={({ isActive }) =>
                                `link-underline text-[13px] uppercase tracking-[0.22em] ${
                                    isActive ? "text-[#4a0e17]" : "text-[#1a1a1a]"
                                }`
                            }
                        >
                            {n.label}
                        </NavLink>
                    ))}
                    <Link
                        to="/gallery"
                        data-testid="header-cta-explore"
                        className="btn-primary"
                    >
                        Explore Works
                    </Link>
                </nav>

                <button
                    data-testid="header-mobile-toggle"
                    onClick={() => setOpen((o) => !o)}
                    className="md:hidden p-2 -mr-2"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <div
                    data-testid="mobile-menu"
                    className="md:hidden bg-[#fdfbf7] border-t border-[#e5e0d8]"
                >
                    <div className="container-editorial py-6 flex flex-col gap-5">
                        {NAV.map((n) => (
                            <NavLink
                                key={n.to}
                                to={n.to}
                                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                                end={n.to === "/"}
                                className="text-[15px] uppercase tracking-[0.22em]"
                            >
                                {n.label}
                            </NavLink>
                        ))}
                        <Link to="/gallery" className="btn-primary self-start" data-testid="mobile-cta-explore">
                            Explore Works
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
