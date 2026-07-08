import Link from "next/link";
import { Church, Globe2, LogIn, Menu } from "lucide-react";

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
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-porcelain/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid h-10 w-10 place-items-center rounded bg-ink text-white shadow-glow">
            <Church size={20} />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-wide text-ink">Naposo Bintara</span>
            <span className="block text-xs font-semibold text-ink/60">NHKBP Bintara</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-3 py-2 text-sm font-bold text-graphite/70 transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/?lang=en"
            className="focus-ring hidden h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink/75 transition hover:text-teal sm:grid"
            aria-label="Switch language"
          >
            <Globe2 size={18} />
          </Link>
          <Link
            href="/login"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-ink text-white shadow-glow"
            aria-label="Sign in"
          >
            <LogIn size={18} />
          </Link>
          <button
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
