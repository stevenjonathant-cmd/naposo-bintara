import Link from "next/link";
import { ArrowRight, Disc3, Hash, Image as ImageIcon, Music2, Search } from "lucide-react";
import { getSongs } from "@/lib/data";

function songHeading(song: { category: string; song_number?: string; title: string }) {
  return `[${song.category || "Chord"}] - ${song.song_number || "-"} : ${song.title}`;
}

export default async function ChordsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = (searchParams?.q ?? "").toLowerCase();
  const allSongs = await getSongs();
  const songs = allSongs.filter((song) => {
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
            <p className="mt-8 text-4xl font-black">{allSongs.length}</p>
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

      <div className="mt-8 rounded border border-ink/10 bg-white/80 backdrop-blur">
        <div className="grid grid-cols-[88px_1fr_auto] gap-3 border-b border-ink/10 px-4 py-3 text-xs font-black uppercase tracking-wide text-graphite/50">
          <span>No</span>
          <span>Judul Lagu</span>
          <span className="hidden sm:inline">Open</span>
        </div>
        {songs.map((song) => (
          <Link
            key={song.id}
            href={`/chords/${song.id}`}
            className="focus-ring grid grid-cols-[88px_1fr_auto] items-center gap-3 border-b border-ink/10 px-4 py-4 transition hover:bg-teal/5 last:border-b-0"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-3 py-2 text-sm font-black text-white">
              <Hash size={14} /> {song.song_number || "-"}
            </span>
            <span>
              <span className="block text-base font-black text-ink sm:text-lg">{songHeading(song)}</span>
              <span className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-graphite/55">
                <span className="inline-flex items-center gap-1"><Disc3 size={13} /> Nada: {song.original_key || "-"}</span>
                <span className="inline-flex items-center gap-1"><ImageIcon size={13} /> {song.image_urls.length} gambar</span>
                {song.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}
              </span>
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm">
              <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
