"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";

export function ChordImageViewer({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return <div className="grid aspect-video place-items-center rounded bg-paper text-sm font-black text-graphite/50">Belum ada gambar chord</div>;
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="focus-ring group relative aspect-video overflow-hidden rounded border border-ink/10 bg-white"
      >
        <Image src={activeImage} alt={title} fill sizes="(min-width: 1024px) 1180px, 100vw" className="object-contain p-2" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-black text-white opacity-95">
          <Maximize2 size={14} /> Lihat full
        </span>
      </button>

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

      {isOpen ? (
        <div className="fixed inset-0 z-[80] bg-black" role="dialog" aria-modal="true">
          <div className="flex h-full flex-col">
            <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between gap-3 text-white">
              <p className="truncate rounded-full bg-black/65 px-3 py-2 text-sm font-black backdrop-blur sm:text-base">{title}</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink"
                aria-label="Tutup gambar"
              >
                <X size={20} />
              </button>
            </div>
            <div className="chord-fullscreen-stage relative min-h-0 flex-1 overflow-hidden bg-black">
              <div className="chord-fullscreen-canvas">
                <Image src={activeImage} alt={title} fill sizes="100vw" className="object-contain" priority />
              </div>
            </div>
            {images.length > 1 ? (
              <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`focus-ring relative h-14 w-24 shrink-0 overflow-hidden rounded border bg-white ${
                      index === activeIndex ? "border-mango" : "border-white/20"
                    }`}
                    aria-label={`Buka gambar chord ${index + 1}`}
                  >
                    <Image src={image} alt={`${title} ${index + 1}`} fill sizes="96px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
