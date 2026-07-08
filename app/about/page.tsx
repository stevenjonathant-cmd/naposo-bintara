import Link from "next/link";
import { ArrowUpRight, Church, HeartHandshake, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel overflow-hidden rounded">
        <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="rounded bg-ink p-6 text-white">
            <p className="eyebrow text-mango">About Us</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Naposobulung HKBP Bintara</h1>
            <p className="mt-5 text-base font-semibold leading-7 text-white/70">
              Pemuda gereja yang bertumbuh dalam pelayanan, persekutuan, dan kehadiran yang berdampak.
            </p>
            <Link
              href="https://www.instagram.com/p/DPI-IlTjw4X/"
              target="_blank"
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-ink"
            >
              Instagram Naposobulung <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid gap-5">
            <article className="rounded border border-ink/10 bg-white/75 p-5">
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

            <article className="rounded border border-ink/10 bg-white/75 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ember text-white">
                  <HeartHandshake size={19} />
                </span>
                <h2 className="text-2xl font-black text-ink">Visi dan Misi</h2>
              </div>
              <p className="mt-4 text-base font-semibold leading-8 text-graphite/70">Menjadi pemuda yang blablabla</p>
            </article>

            <article className="rounded border border-ink/10 bg-white/75 p-5">
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
