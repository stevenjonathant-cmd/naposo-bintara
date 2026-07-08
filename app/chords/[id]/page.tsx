import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Disc3, Hash } from "lucide-react";
import { ChordImageViewer } from "@/components/chord-image-viewer";
import { ChordTransposer } from "@/components/chord-transposer";
import { getSongs } from "@/lib/data";

function songHeading(song: { category: string; song_number?: string; title: string }) {
  return `[${song.category || "Chord"}] - ${song.song_number || "-"} : ${song.title}`;
}

export default async function ChordDetailPage({ params }: { params: { id: string } }) {
  const songs = await getSongs();
  const song = songs.find((item) => item.id === params.id);

  if (!song) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/chords" className="focus-ring inline-flex items-center gap-2 rounded border border-ink/15 bg-white px-4 py-2 text-sm font-black text-ink">
        <ArrowLeft size={17} /> Back to list
      </Link>

      <section className="mt-6 glass-panel rounded p-5 sm:p-6">
        <p className="eyebrow text-ember">Buku Ende Chords</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-ink sm:text-5xl">{songHeading(song)}</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-sm font-black text-white">
            <Hash size={15} /> No: {song.song_number || "-"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ink">
            <Disc3 size={15} /> Nada: {song.original_key || "-"}
          </span>
        </div>
      </section>

      <section className="mt-6 grid gap-6">
        <div className="glass-panel rounded p-4">
          <ChordImageViewer images={song.image_urls} title={songHeading(song)} songId={song.id} />
        </div>

        <div className="grid gap-5">
          <div className="glass-panel rounded p-5">
            <dl className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded border border-ink/10 bg-white/70 p-3">
                <dt className="font-black text-graphite/50">Kategori</dt>
                <dd className="mt-1 font-black text-ink">{song.category || "-"}</dd>
              </div>
              <div className="rounded border border-ink/10 bg-white/70 p-3">
                <dt className="font-black text-graphite/50">Nomor</dt>
                <dd className="mt-1 font-black text-ink">{song.song_number || "-"}</dd>
              </div>
              <div className="rounded border border-ink/10 bg-white/70 p-3">
                <dt className="font-black text-graphite/50">Judul</dt>
                <dd className="mt-1 font-black text-ink">{song.title}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm font-semibold text-graphite/60">{song.tags.map((tag) => `#${tag}`).join(" ")}</p>
          </div>

          {song.chord_text ? <ChordTransposer chordText={song.chord_text} originalKey={song.original_key} /> : null}
        </div>
      </section>
    </main>
  );
}
