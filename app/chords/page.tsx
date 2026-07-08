import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { getSongs } from "@/lib/data";

export default async function ChordsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = (searchParams?.q ?? "").toLowerCase();
  const songs = (await getSongs()).filter((song) => {
    const haystack = [song.title, song.category, song.song_number, ...song.tags].join(" ").toLowerCase();
    return haystack.includes(query);
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-panel rounded p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-teal">Dedicated library</p>
            <h1 className="mt-2 text-4xl font-black text-ink sm:text-5xl">Chord Browser</h1>
            <p className="mt-3 max-w-2xl text-graphite/70">Browse Buku Ende, praise songs, and image-based chord sheets made for ministry use.</p>
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
        <div className="mt-6 flex flex-wrap gap-2">
          {["All", "Buku Ende", "Praise", "Youth", "Sunday"].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-xs font-black text-graphite/70">
              <SlidersHorizontal size={13} /> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {songs.map((song) => (
          <article key={song.id} className="glass-panel rounded p-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded bg-paper">
              <Image src={song.image_urls[0]} alt={song.title} fill className="object-cover" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-black uppercase tracking-wide text-ember">{song.category}</p>
              <h2 className="mt-1 text-xl font-black text-ink">{song.title}</h2>
              <p className="mt-2 text-sm font-semibold text-graphite/60">{song.tags.map((tag) => `#${tag}`).join(" ")}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
