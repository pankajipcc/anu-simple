import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LogOut, Plus, Pencil, Trash2, Star, StarOff } from "lucide-react";
import {
    fetchMe,
    fetchArtworks,
    fetchCategories,
    fetchTestimonials,
    fetchSettings,
    adminArtworks,
    adminCategories,
    adminEnquiries,
    adminTestimonials,
    adminSettings,
} from "@/lib/api";
import { useConfirm } from "@/components/site/ConfirmDialog";

const TABS = ["Artworks", "Categories", "Enquiries", "Testimonials", "Settings"];

const emptyArt = {
    title: "", category: "madhubani", medium: "Natural pigments on handmade paper", size: "",
    price: 0, currency: "INR", availability: "available", description: "", story: "",
    year: new Date().getFullYear(), image_url: "", additional_images: [], featured: false, certificate: true, order: 0,
};

export default function AdminDashboard() {
    const nav = useNavigate();
    const { confirm, Dialog: ConfirmDialog } = useConfirm();
    const [ready, setReady] = useState(false);
    const [tab, setTab] = useState("Artworks");
    const [artworks, setArtworks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [settings, setSettings] = useState(null);

    const [editingArt, setEditingArt] = useState(null); // null | new | object
    const [editingCat, setEditingCat] = useState(null);
    const [editingTest, setEditingTest] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem("anu_admin_token")) return;
        fetchMe()
            .then(() => setReady(true))
            .catch(() => {
                localStorage.removeItem("anu_admin_token");
                nav("/admin/login");
            });
    }, [nav]);

    const reloadAll = async () => {
        const [a, c, e, t, s] = await Promise.all([
            fetchArtworks({ limit: 200 }),
            fetchCategories(),
            adminEnquiries.list(),
            fetchTestimonials(),
            fetchSettings(),
        ]);
        setArtworks(a); setCategories(c); setEnquiries(e); setTestimonials(t); setSettings(s);
    };

    useEffect(() => { if (ready) reloadAll(); }, [ready]);

    if (!localStorage.getItem("anu_admin_token")) return <Navigate to="/admin/login" replace />;
    if (!ready) return <div className="p-10">Loading…</div>;

    const logout = () => { localStorage.removeItem("anu_admin_token"); nav("/admin/login"); };

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            <header className="border-b border-[#e5e0d8]">
                <div className="container-editorial h-16 flex items-center justify-between">
                    <p className="font-serif text-2xl">Anu Kalakriti · Admin</p>
                    <button data-testid="admin-logout" onClick={logout} className="text-[13px] uppercase tracking-[0.22em] link-underline inline-flex items-center gap-2"><LogOut size={14}/> Logout</button>
                </div>
                <div className="container-editorial flex gap-2 overflow-x-auto pb-3">
                    {TABS.map((t) => (
                        <button key={t} data-testid={`admin-tab-${t.toLowerCase()}`} onClick={() => setTab(t)} className={`px-4 py-2 text-[12px] uppercase tracking-[0.22em] rounded-full border ${tab === t ? "bg-[#1a1a1a] text-[#fdfbf7] border-[#1a1a1a]" : "border-[#e5e0d8]"}`}>{t}</button>
                    ))}
                </div>
            </header>

            <main className="container-editorial py-10">
                {tab === "Artworks" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-3xl">Artworks ({artworks.length})</h2>
                            <button data-testid="admin-add-artwork" className="btn-primary" onClick={() => setEditingArt({ ...emptyArt })}><Plus size={14}/> New</button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {artworks.map((a) => (
                                <div key={a.id} data-testid={`admin-artwork-${a.slug}`} className="border border-[#e5e0d8] bg-white">
                                    <img src={a.image_url} alt={a.title} className="w-full h-48 object-cover"/>
                                    <div className="p-4">
                                        <p className="font-serif text-xl">{a.title}</p>
                                        <p className="text-[12px] uppercase tracking-[0.22em] text-[#7a726c]">{a.category} · {a.availability}</p>
                                        <div className="mt-3 flex items-center gap-3">
                                            <button data-testid={`admin-edit-artwork-${a.slug}`} onClick={() => setEditingArt(a)} className="text-[13px] link-underline inline-flex items-center gap-1"><Pencil size={12}/> Edit</button>
                                            <button data-testid={`admin-feature-artwork-${a.slug}`} onClick={async () => { await adminArtworks.update(a.id, { ...a, featured: !a.featured }); reloadAll(); }} className="text-[13px] link-underline inline-flex items-center gap-1">
                                                {a.featured ? <><StarOff size={12}/> Unfeature</> : <><Star size={12}/> Feature</>}
                                            </button>
                                            <button data-testid={`admin-delete-artwork-${a.slug}`} onClick={async () => { if (await confirm({ title: "Delete artwork?", message: `"${a.title}" will be permanently removed.`, confirmLabel: "Delete" })) { await adminArtworks.remove(a.id); reloadAll(); } }} className="text-[13px] link-underline text-[#4a0e17] inline-flex items-center gap-1"><Trash2 size={12}/> Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {editingArt && (
                            <ArtworkModal
                                initial={editingArt}
                                categories={categories}
                                onClose={() => setEditingArt(null)}
                                onSave={async (data) => {
                                    if (editingArt.id) await adminArtworks.update(editingArt.id, data);
                                    else await adminArtworks.create(data);
                                    setEditingArt(null);
                                    reloadAll();
                                }}
                            />
                        )}
                    </div>
                )}

                {tab === "Categories" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-3xl">Categories</h2>
                            <button data-testid="admin-add-category" className="btn-primary" onClick={() => setEditingCat({ name: "", description: "", order: 0 })}><Plus size={14}/> New</button>
                        </div>
                        <div className="border border-[#e5e0d8] bg-white">
                            {categories.map((c) => (
                                <div key={c.id} data-testid={`admin-category-${c.slug}`} className="flex items-center justify-between p-4 border-b border-[#e5e0d8] last:border-b-0">
                                    <div>
                                        <p className="font-serif text-lg">{c.name}</p>
                                        <p className="text-[12px] text-[#7a726c]">{c.slug} · {c.description}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => setEditingCat(c)} className="text-[13px] link-underline"><Pencil size={12} className="inline"/> Edit</button>
                                        <button onClick={async () => { if (await confirm({ title: "Delete category?", message: `"${c.name}" will be removed.`, confirmLabel: "Delete" })) { await adminCategories.remove(c.id); reloadAll(); } }} className="text-[13px] link-underline text-[#4a0e17]"><Trash2 size={12} className="inline"/> Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {editingCat && (
                            <CategoryModal
                                initial={editingCat}
                                onClose={() => setEditingCat(null)}
                                onSave={async (data) => {
                                    if (editingCat.id) await adminCategories.update(editingCat.id, data);
                                    else await adminCategories.create(data);
                                    setEditingCat(null);
                                    reloadAll();
                                }}
                            />
                        )}
                    </div>
                )}

                {tab === "Enquiries" && (
                    <div>
                        <h2 className="font-serif text-3xl mb-6">Enquiries ({enquiries.length})</h2>
                        <div className="space-y-4">
                            {enquiries.map((e) => (
                                <div key={e.id} data-testid={`admin-enquiry-${e.id}`} className="border border-[#e5e0d8] bg-white p-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">{e.name} · <span className="text-[#7a726c] text-[13px]">{e.email}{e.phone ? ` · ${e.phone}` : ""}</span></p>
                                            <p className="text-[12px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">{e.type} {e.artwork_title ? `· ${e.artwork_title}` : ""} · {new Date(e.created_at).toLocaleString()}</p>
                                        </div>
                                        <button onClick={async () => { if (await confirm({ title: "Delete enquiry?", message: `Message from ${e.name} will be deleted.`, confirmLabel: "Delete" })) { await adminEnquiries.remove(e.id); reloadAll(); } }} className="text-[13px] link-underline text-[#4a0e17]"><Trash2 size={12} className="inline"/> Delete</button>
                                    </div>
                                    <p className="mt-3 text-[14px] leading-relaxed">{e.message}</p>
                                </div>
                            ))}
                            {enquiries.length === 0 && <p className="text-[#7a726c]">No enquiries yet.</p>}
                        </div>
                    </div>
                )}

                {tab === "Testimonials" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-3xl">Testimonials</h2>
                            <button data-testid="admin-add-testimonial" className="btn-primary" onClick={() => setEditingTest({ name: "", location: "", quote: "", rating: 5, order: 0 })}><Plus size={14}/> New</button>
                        </div>
                        <div className="space-y-4">
                            {testimonials.map((t) => (
                                <div key={t.id} className="border border-[#e5e0d8] bg-white p-5">
                                    <p className="font-serif italic">&ldquo;{t.quote}&rdquo;</p>
                                    <p className="text-[13px] mt-2">— {t.name}, <span className="text-[#7a726c]">{t.location}</span></p>
                                    <div className="mt-3 flex gap-3">
                                        <button onClick={() => setEditingTest(t)} className="text-[13px] link-underline"><Pencil size={12} className="inline"/> Edit</button>
                                        <button onClick={async () => { if (await confirm({ title: "Delete testimonial?", message: `${t.name}'s note will be removed.`, confirmLabel: "Delete" })) { await adminTestimonials.remove(t.id); reloadAll(); } }} className="text-[13px] link-underline text-[#4a0e17]"><Trash2 size={12} className="inline"/> Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {editingTest && (
                            <TestimonialModal
                                initial={editingTest}
                                onClose={() => setEditingTest(null)}
                                onSave={async (data) => {
                                    if (editingTest.id) await adminTestimonials.update(editingTest.id, data);
                                    else await adminTestimonials.create(data);
                                    setEditingTest(null);
                                    reloadAll();
                                }}
                            />
                        )}
                    </div>
                )}

                {tab === "Settings" && settings && (
                    <SettingsForm initial={settings} onSave={async (data) => { await adminSettings.update(data); reloadAll(); }} />
                )}
            </main>
            {ConfirmDialog}
        </div>
    );
}

function Modal({ children, onClose, title }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto p-6" onClick={onClose}>
            <div className="bg-white border border-[#e5e0d8] w-full max-w-2xl my-10" onClick={(e) => e.stopPropagation()}>
                <div className="p-5 border-b border-[#e5e0d8] flex items-center justify-between">
                    <p className="font-serif text-xl">{title}</p>
                    <button onClick={onClose} className="text-[13px] link-underline">Close</button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="block text-[12px] uppercase tracking-[0.22em] text-[#7a726c] mb-1">{label}</span>
            {children}
        </label>
    );
}

function ArtworkModal({ initial, categories, onClose, onSave }) {
    const [f, setF] = useState(initial);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    return (
        <Modal title={initial.id ? "Edit artwork" : "New artwork"} onClose={onClose}>
            <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="grid grid-cols-2 gap-4" data-testid="admin-artwork-form">
                <Field label="Title"><input required value={f.title} onChange={(e) => set("title", e.target.value)} className="pill-input w-full" data-testid="admin-art-title"/></Field>
                <Field label="Category">
                    <select value={f.category} onChange={(e) => set("category", e.target.value)} className="pill-input w-full" data-testid="admin-art-category">
                        {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                    </select>
                </Field>
                <Field label="Medium"><input value={f.medium} onChange={(e) => set("medium", e.target.value)} className="pill-input w-full"/></Field>
                <Field label="Size"><input value={f.size} onChange={(e) => set("size", e.target.value)} className="pill-input w-full"/></Field>
                <Field label="Price (INR)"><input type="number" value={f.price} onChange={(e) => set("price", Number(e.target.value))} className="pill-input w-full" data-testid="admin-art-price"/></Field>
                <Field label="Year"><input type="number" value={f.year || ""} onChange={(e) => set("year", Number(e.target.value))} className="pill-input w-full"/></Field>
                <Field label="Availability">
                    <select value={f.availability} onChange={(e) => set("availability", e.target.value)} className="pill-input w-full">
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                    </select>
                </Field>
                <Field label="Order"><input type="number" value={f.order} onChange={(e) => set("order", Number(e.target.value))} className="pill-input w-full"/></Field>
                <div className="col-span-2"><Field label="Main image URL"><input required value={f.image_url} onChange={(e) => set("image_url", e.target.value)} className="pill-input w-full" data-testid="admin-art-image"/></Field></div>
                <div className="col-span-2"><Field label="Additional images (comma separated)">
                    <input value={(f.additional_images || []).join(", ")} onChange={(e) => set("additional_images", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="pill-input w-full"/>
                </Field></div>
                <div className="col-span-2"><Field label="Description"><textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} className="pill-input w-full rounded-2xl"/></Field></div>
                <div className="col-span-2"><Field label="Story"><textarea rows={2} value={f.story} onChange={(e) => set("story", e.target.value)} className="pill-input w-full rounded-2xl"/></Field></div>
                <label className="flex items-center gap-2 col-span-1"><input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)}/> Featured on home</label>
                <label className="flex items-center gap-2 col-span-1"><input type="checkbox" checked={f.certificate} onChange={(e) => set("certificate", e.target.checked)}/> Certificate</label>
                <div className="col-span-2 flex items-center gap-4 mt-2">
                    <button className="btn-primary" data-testid="admin-art-save">Save</button>
                    <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
                </div>
            </form>
        </Modal>
    );
}

function CategoryModal({ initial, onClose, onSave }) {
    const [f, setF] = useState(initial);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    return (
        <Modal title={initial.id ? "Edit category" : "New category"} onClose={onClose}>
            <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="grid gap-4">
                <Field label="Name"><input required value={f.name} onChange={(e) => set("name", e.target.value)} className="pill-input w-full"/></Field>
                <Field label="Description"><textarea rows={2} value={f.description} onChange={(e) => set("description", e.target.value)} className="pill-input w-full rounded-2xl"/></Field>
                <Field label="Order"><input type="number" value={f.order} onChange={(e) => set("order", Number(e.target.value))} className="pill-input w-full"/></Field>
                <div className="flex gap-4"><button className="btn-primary">Save</button><button type="button" onClick={onClose} className="btn-outline">Cancel</button></div>
            </form>
        </Modal>
    );
}

function TestimonialModal({ initial, onClose, onSave }) {
    const [f, setF] = useState(initial);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    return (
        <Modal title={initial.id ? "Edit testimonial" : "New testimonial"} onClose={onClose}>
            <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="grid gap-4">
                <Field label="Name"><input required value={f.name} onChange={(e) => set("name", e.target.value)} className="pill-input w-full"/></Field>
                <Field label="Location"><input value={f.location} onChange={(e) => set("location", e.target.value)} className="pill-input w-full"/></Field>
                <Field label="Quote"><textarea rows={4} required value={f.quote} onChange={(e) => set("quote", e.target.value)} className="pill-input w-full rounded-2xl"/></Field>
                <Field label="Order"><input type="number" value={f.order} onChange={(e) => set("order", Number(e.target.value))} className="pill-input w-full"/></Field>
                <div className="flex gap-4"><button className="btn-primary">Save</button><button type="button" onClick={onClose} className="btn-outline">Cancel</button></div>
            </form>
        </Modal>
    );
}

function SettingsForm({ initial, onSave }) {
    const [f, setF] = useState(initial);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    const [saved, setSaved] = useState(false);
    return (
        <form onSubmit={async (e) => { e.preventDefault(); await onSave(f); setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="grid md:grid-cols-2 gap-5" data-testid="admin-settings-form">
            <h2 className="font-serif text-3xl col-span-full mb-2">Site Settings</h2>
            {[
                ["site_title", "Site title"], ["tagline", "Tagline"],
                ["hero_heading", "Hero heading (\\n for line break)"], ["hero_subtext", "Hero subtext"],
                ["hero_image", "Hero image URL"], ["artist_image", "Artist image URL"],
                ["about_short", "About (short)"], ["about_long", "About (long)"],
                ["whatsapp_number", "WhatsApp number"], ["email", "Public email"], ["phone", "Phone"],
                ["address", "Studio address"], ["maps_url", "Google Maps URL"],
                ["instagram", "Instagram URL"], ["facebook", "Facebook URL"],
            ].map(([k, label]) => (
                <Field key={k} label={label}>
                    {k.includes("hero") || k.includes("about") ? (
                        <textarea rows={2} value={f[k] || ""} onChange={(e) => set(k, e.target.value)} className="pill-input w-full rounded-2xl"/>
                    ) : (
                        <input value={f[k] || ""} onChange={(e) => set(k, e.target.value)} className="pill-input w-full"/>
                    )}
                </Field>
            ))}
            <div className="col-span-full flex items-center gap-4"><button className="btn-primary" data-testid="admin-settings-save">Save</button>{saved && <p className="text-[13px] text-[#2E4A62]">Saved.</p>}</div>
        </form>
    );
}
