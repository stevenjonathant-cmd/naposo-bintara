"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe2, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/events", label: "Events" },
  { href: "/petugas-pelayanan", label: "Petugas Pelayanan" },
  { href: "/chords", label: "Buku Ende Chords" },
  { href: "/finance", label: "Finance" },
  { href: "/about", label: "About Us" },
  { href: "/admin", label: "Admin" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-sm">
            <Image src="/brand/logo-hkbp-bintara.png" alt="NHKBP Bintara" fill sizes="48px" className="object-contain p-1" priority />
          </span>
          <span>
            <span className="block text-base font-black uppercase leading-none tracking-tight text-ink">Naposo Bintara</span>
            <span className="mt-1 block text-[11px] font-black uppercase tracking-[0.25em] text-ink/50">NHKBP Bintara</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-3 py-2 text-sm font-black text-graphite/72 transition hover:bg-ink hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/?lang=en"
            className="focus-ring hidden h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink/75 transition hover:bg-ink hover:text-white sm:grid"
            aria-label="Switch language"
          >
            <Globe2 size={18} />
          </Link>
          <Link
            href="/login"
            className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-glow"
            aria-label="Sign in"
          >
            <LogIn size={18} />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isOpen ? (
        <nav className="border-t border-black/10 bg-ink px-4 py-4 shadow-soft md:hidden" aria-label="Mobile navigation">
          <div className="grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="focus-ring rounded-2xl px-4 py-3 text-base font-black text-white transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/?lang=en"
              onClick={() => setIsOpen(false)}
              className="focus-ring rounded-2xl px-4 py-3 text-base font-black text-white transition hover:bg-white/10 sm:hidden"
            >
              Switch Language
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
