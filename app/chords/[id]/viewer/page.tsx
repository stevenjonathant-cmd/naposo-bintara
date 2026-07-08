import { notFound } from "next/navigation";
import { ChordFullscreenViewer } from "@/components/chord-fullscreen-viewer";
import { getSongs } from "@/lib/data";

function songHeading(song: { category: string; song_number?: string; title: string }) {
  return `[${song.category || "Chord"}] - ${song.song_number || "-"} : ${song.title}`;
}

export default async function ChordViewerPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: { image?: string };
}) {
  const songs = await getSongs();
  const song = songs.find((item) => item.id === params.id);

  if (!song) notFound();

  return (
    <ChordFullscreenViewer
      images={song.image_urls}
      initialIndex={Number(searchParams?.image ?? 0)}
      title={songHeading(song)}
      backHref={`/chords/${song.id}`}
    />
  );
}
