"use client";

import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

type InstagramPost = {
  title: string;
  href: string;
  label: string;
};

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

function fallbackCard(post: InstagramPost) {
  return (
    <Link key={post.href} href={post.href} target="_blank" className="focus-ring group church-card block">
      <div className="poster-panel min-h-64 bg-ink p-6 text-white transition group-hover:bg-ember">
        <Instagram size={24} />
        <p className="mt-12 text-sm font-black uppercase tracking-[0.24em] text-white/60">{post.label}</p>
        <h3 className="mt-3 text-3xl font-black uppercase leading-none">{post.title}</h3>
      </div>
      <div className="flex items-center justify-between p-4 text-sm font-black text-ink">
        View on Instagram
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}

export function InstagramEmbedGrid({ posts }: { posts: InstagramPost[] }) {
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("instagram-embed-script");

    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", () => window.instgrm?.Embeds?.process(), { once: true });
      existingScript.addEventListener("error", () => setScriptFailed(true), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm?.Embeds?.process();
    script.onerror = () => setScriptFailed(true);
    document.body.appendChild(script);
  }, []);

  if (scriptFailed) {
    return <div className="grid gap-4 md:grid-cols-3">{posts.map((post) => fallbackCard(post))}</div>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.href} className="church-card overflow-hidden bg-white">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">{post.label}</p>
              <h3 className="mt-1 text-lg font-black text-ink">{post.title}</h3>
            </div>
            <Instagram className="text-ink/45" size={20} />
          </div>
          <div className="min-h-[420px] overflow-hidden bg-white px-2 py-3">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={post.href}
              data-instgrm-version="14"
              style={{
                background: "#fff",
                border: 0,
                margin: "0 auto",
                maxWidth: "540px",
                minWidth: 0,
                padding: 0,
                width: "100%"
              }}
            >
              <Link href={post.href} target="_blank" className="block p-6 text-sm font-black text-ink">
                View this post on Instagram
              </Link>
            </blockquote>
          </div>
          <Link href={post.href} target="_blank" className="flex items-center justify-between border-t border-black/10 p-4 text-sm font-black text-ink transition hover:bg-neutral-50">
            View on Instagram
            <ArrowRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}
