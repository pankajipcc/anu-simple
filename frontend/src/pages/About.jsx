import { useSettings } from "@/lib/settings";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";

export default function About() {
    const { settings } = useSettings();
    const s = settings || {};
    return (
        <>
            <Seo title="About the Artist · Anu Kalakriti" description={s.about_short} image={s.artist_image} path="/about" />
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />

            <section className="container-editorial py-10 grid md:grid-cols-12 gap-14 items-start">
                <div className="md:col-span-5">
                    <div className="overflow-hidden border border-[#e5e0d8] aspect-[4/5] bg-[#f7f3ea]">
                        <img src={s.artist_image} alt="Anu, the artist" className="w-full h-full object-cover img-lift" />
                    </div>
                </div>
                <div className="md:col-span-7">
                    <p className="eyebrow">The Artist</p>
                    <h1 className="headline headline-lg mt-3">Anu — keeper of Mithila lines.</h1>
                    <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#3b3532] max-w-xl">
                        <p>{s.about_short}</p>
                        {s.about_long ? (
                            <p>{s.about_long}</p>
                        ) : (
                            <>
                                <p>
                                    Born in the Madhubani district of Bihar, Anu grew up watching her grandmother paint kohbar walls for weddings — cows, fish, parrots, lotuses appearing overnight in white lime and turmeric. That memory became her practice.
                                </p>
                                <p>
                                    For over fifteen years, Anu has worked with natural pigments — indigo, geru, hibiscus, bark — on handmade paper, canvas, and occasionally silk. She paints slowly. Each piece is a meditation, sometimes finished, sometimes lived with for weeks before it is signed.
                                </p>
                                <p>
                                    Her work has been exhibited at cultural centres in Delhi, Mumbai and Kolkata, and lives in private collections across India, the UK, France and Singapore.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="mt-14 grid grid-cols-3 gap-8 border-t border-[#e5e0d8] pt-10 max-w-lg">
                        <div>
                            <p className="font-serif text-4xl text-[#4a0e17]">15+</p>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">Years painting</p>
                        </div>
                        <div>
                            <p className="font-serif text-4xl text-[#4a0e17]">200+</p>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">Works sold</p>
                        </div>
                        <div>
                            <p className="font-serif text-4xl text-[#4a0e17]">18</p>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a726c] mt-1">Countries</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
