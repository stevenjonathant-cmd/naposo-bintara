"use client";

import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { useState } from "react";

export function ChordImageViewer({ images, title, songId }: { images: string[]; title: string; songId: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return <div className="grid aspect-video place-items-center rounded bg-paper text-sm font-black text-graphite/50">Belum ada gambar chord</div>;
  }

  return (
    <div className="grid gap-3">
      <Link
        href={`/chords/${songId}/viewer?image=${activeIndex}`}
        target="_blank"
        className="focus-ring group relative aspect-video overflow-hidden rounded border border-ink/10 bg-white"
      >
        <Image src={activeImage} alt={title} fill sizes="(min-width: 1024px) 1180px, 100vw" className="object-contain p-2" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-black text-white opacity-95">
          <Maximize2 size={14} /> Lihat full
        </span>
      </Link>

      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`focus-ring relative h-16 w-28 shrink-0 overflow-hidden rounded border bg-white ${
                index === activeIndex ? "border-ember" : "border-ink/10"
              }`}
              aria-label={`Buka gambar chord ${index + 1}`}
            >
              <Image src={image} alt={`${title} ${index + 1}`} fill sizes="112px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
