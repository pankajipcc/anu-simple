import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SettingsProvider, useSettings } from "@/lib/settings";
import ScrollToTop from "@/components/site/ScrollToTop";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import LocalBusinessJsonLd from "@/components/site/LocalBusinessJsonLd";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import ArtworkDetail from "@/pages/ArtworkDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

import AudienceConnectDock from "@/components/site/AudienceConnectDock";

function PublicLayout({ children }) {
    const { settings } = useSettings();
    return (
        <>
            <a href="#main" className="skip-link">Skip to content</a>
            <LocalBusinessJsonLd settings={settings} />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <AudienceConnectDock />
        </>
    );
}

function Shell() {
    const { pathname } = useLocation();
    const isAdmin = pathname.startsWith("/admin");
    if (isAdmin) {
        return (
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        );
    }
    return (
        <PublicLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/artwork/:slug" element={<ArtworkDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </PublicLayout>
    );
}

function App() {
    return (
        <SettingsProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Shell />
            </BrowserRouter>
        </SettingsProvider>
    );
}

export default App;
