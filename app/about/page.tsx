import Link from "next/link";
import { ArrowUpRight, Church, HeartHandshake, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="section-shell">
      <section className="church-card">
        <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="photo-panel min-h-96 rounded-[28px] p-7 text-white">
            <p className="eyebrow text-mango">About Us</p>
            <h1 className="mt-4 text-5xl font-black uppercase leading-none sm:text-6xl">Naposobulung HKBP Bintara</h1>
            <p className="mt-5 text-base font-semibold leading-7 text-white/70">
              Pemuda gereja yang bertumbuh dalam pelayanan, persekutuan, dan kehadiran yang berdampak.
            </p>
            <Link
              href="https://www.instagram.com/p/DPI-IlTjw4X/"
              target="_blank"
              className="church-button-light mt-8"
            >
              Instagram Naposobulung <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid gap-5">
            <article className="rounded-[24px] border border-ink/10 bg-neutral-50 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white">
                  <Church size={19} />
                </span>
                <h2 className="text-2xl font-black text-ink">Who We Are</h2>
              </div>
              <p className="mt-4 text-base font-semibold leading-8 text-graphite/70">
                Naposobulung HKBP Bintara adalah perkumpulan pemuda Gereja HKBP Bintara. Berdiri sejak Tahun 2020, kami terus meningkatkan semangat untuk melayani di gereja, maupun di masyarakat.
              </p>
            </article>

            <article className="rounded-[24px] border border-ink/10 bg-neutral-50 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ember text-white">
                  <HeartHandshake size={19} />
                </span>
                <h2 className="text-2xl font-black text-ink">Visi dan Misi</h2>
              </div>
              <p className="mt-4 text-base font-semibold leading-8 text-graphite/70">Menjadi pemuda yang blablabla</p>
            </article>

            <article className="rounded-[24px] border border-ink/10 bg-neutral-50 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-mango text-ink">
                  <Sparkles size={19} />
                </span>
                <h2 className="text-2xl font-black text-ink">Our Community</h2>
              </div>
              <p className="mt-4 text-base font-semibold leading-8 text-graphite/70">
                Tempat bertumbuh bersama, belajar melayani, dan membangun relasi antar pemuda dalam kasih Kristus.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
