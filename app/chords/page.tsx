import Image from "next/image";
import { Disc3, Hash, Music2, Search } from "lucide-react";
import { ChordTransposer } from "@/components/chord-transposer";
import { getSongs } from "@/lib/data";

export default async function ChordsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = (searchParams?.q ?? "").toLowerCase();
  const songs = (await getSongs()).filter((song) => {
    const haystack = [song.title, song.category, song.song_number, song.original_key, ...song.tags].join(" ").toLowerCase();
    return haystack.includes(query);
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-panel overflow-hidden rounded">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_0.8fr] lg:p-8">
          <div>
            <p className="eyebrow text-teal">Chord Library</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-ink sm:text-5xl">Buku Ende & Chord Pelayanan</h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-graphite/70">
              Cari lagu berdasarkan nomor Buku Ende, judul, atau nada dasar. Simpan gambar chord dan versi teks untuk transpose.
            </p>
          </div>
          <div className="rounded bg-ink p-5 text-white">
            <Music2 size={28} />
            <p className="mt-8 text-4xl font-black">{songs.length}</p>
            <p className="mt-1 text-sm font-bold text-white/60">lagu tersedia dalam library</p>
          </div>
        </div>
      </div>

      <section className="mt-6 rounded border border-ink/10 bg-white/80 p-4 backdrop-blur">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black text-ink">Search before opening</p>
            <p className="mt-1 text-sm font-semibold text-graphite/60">Contoh: ketik `356`, `Sai Tong`, atau `G`.</p>
          </div>
          <form className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" size={18} />
            <input
              name="q"
              defaultValue={searchParams?.q}
              placeholder="Cari judul, nomor, tag..."
              className="focus-ring w-full rounded border border-ink/15 bg-white py-3 pl-10 pr-3 font-semibold text-ink"
            />
          </form>
        </div>
      </section>

      <div className="mt-8 grid gap-5">
        {songs.map((song) => (
          <article key={song.id} className="glass-panel grid gap-5 rounded p-4 lg:grid-cols-[260px_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded bg-paper">
              {song.image_urls[0] ? <Image src={song.image_urls[0]} alt={song.title} fill className="object-cover" /> : null}
            </div>
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-ember">{song.category || "Chord"}</p>
                  <h2 className="mt-2 text-3xl font-black text-ink">{song.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-sm font-black text-white">
                    <Hash size={15} /> No: {song.song_number || "-"}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ink">
                    <Disc3 size={15} /> Nada: {song.original_key || "-"}
                  </span>
                </div>
              </div>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded border border-ink/10 bg-white/70 p-3">
                  <dt className="font-black text-graphite/50">No</dt>
                  <dd className="mt-1 font-black text-ink">{song.song_number || "-"}</dd>
                </div>
                <div className="rounded border border-ink/10 bg-white/70 p-3">
                  <dt className="font-black text-graphite/50">Judul</dt>
                  <dd className="mt-1 font-black text-ink">{song.title}</dd>
                </div>
                <div className="rounded border border-ink/10 bg-white/70 p-3">
                  <dt className="font-black text-graphite/50">Nada dasar original</dt>
                  <dd className="mt-1 font-black text-ink">{song.original_key || "-"}</dd>
                </div>
              </dl>
              {song.chord_text ? (
                <div className="mt-5">
                  <ChordTransposer chordText={song.chord_text} originalKey={song.original_key} />
                </div>
              ) : null}
              <p className="mt-4 text-sm font-semibold text-graphite/60">{song.tags.map((tag) => `#${tag}`).join(" ")}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
