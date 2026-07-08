"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, MonitorSmartphone, RotateCw } from "lucide-react";
import { useState } from "react";

export function ChordFullscreenViewer({
  images,
  initialIndex,
  title,
  backHref
}: {
  images: string[];
  initialIndex: number;
  title: string;
  backHref: string;
}) {
  const safeInitialIndex = Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0));
  const [activeIndex, setActiveIndex] = useState(safeInitialIndex);
  const [mode, setMode] = useState<"landscape" | "fit">("landscape");
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <main className="fixed inset-0 z-[100] grid place-items-center bg-black px-5 text-center text-white">
        <div>
          <p className="text-2xl font-black">Belum ada gambar chord</p>
          <Link href={backHref} className="focus-ring mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-ink">
            Kembali
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black text-white">
      <div className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between gap-2">
        <Link href={backHref} className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink" aria-label="Kembali">
          <ArrowLeft size={20} />
        </Link>
        <p className="min-w-0 flex-1 truncate rounded-full bg-black/65 px-3 py-2 text-center text-xs font-black backdrop-blur sm:text-sm">
          {title} - {activeIndex + 1}/{images.length}
        </p>
        <a href={activeImage} target="_blank" rel="noreferrer" className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink" aria-label="Open raw image">
          <ExternalLink size={19} />
        </a>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-20 grid gap-2">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("landscape")}
            className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black ${
              mode === "landscape" ? "bg-mango text-ink" : "bg-white/90 text-ink"
            }`}
          >
            <RotateCw size={15} /> Landscape View
          </button>
          <button
            type="button"
            onClick={() => setMode("fit")}
            className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black ${
              mode === "fit" ? "bg-mango text-ink" : "bg-white/90 text-ink"
            }`}
          >
            <MonitorSmartphone size={15} /> Fit Screen
          </button>
        </div>

        {images.length > 1 ? (
          <div className="flex justify-center gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`focus-ring h-10 min-w-10 rounded-full border px-3 text-xs font-black ${
                  index === activeIndex ? "border-mango bg-mango text-ink" : "border-white/20 bg-white/90 text-ink"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className={`chord-viewer-stage ${mode === "landscape" ? "is-landscape" : "is-fit"}`}>
        <div className="chord-viewer-frame">
          <img src={activeImage} alt={title} className="chord-viewer-image" />
        </div>
      </div>
    </main>
  );
}
