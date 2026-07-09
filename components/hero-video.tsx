"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  function toggleAudio() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      void video.play();
    }
  }

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/brand/hero-ad.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#24106a]/25 to-black/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(149,92,255,0.38),transparent_28rem)]" />
      <button
        type="button"
        onClick={toggleAudio}
        className="focus-ring absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black text-ink shadow-glow transition hover:bg-ink hover:text-white"
        aria-label={isMuted ? "Turn hero audio on" : "Mute hero audio"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        {isMuted ? "Sound Off" : "Sound On"}
      </button>
    </div>
  );
}
