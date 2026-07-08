import { Mail } from "lucide-react";
import { signInWithEmail, signInWithPassword } from "@/app/login/actions";

export default function LoginPage({ searchParams }: { searchParams?: { status?: string; message?: string } }) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded border border-ink/10 bg-white p-6 shadow-sm">
        <div className="grid h-12 w-12 place-items-center rounded bg-ember text-white">
          <Mail size={22} />
        </div>
        <h1 className="mt-5 text-3xl font-black text-ink">Masuk anggota</h1>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          Masuk dengan email dan password. Admin dapat membuat user dari Supabase dan memberi akses dari dashboard.
        </p>
        {searchParams?.status === "password-required" ? (
          <p className="mt-4 rounded bg-mango/25 p-3 text-sm font-bold text-ink">Masukkan email dan password.</p>
        ) : null}
        {searchParams?.status === "password-error" ? (
          <p className="mt-4 rounded bg-ember/10 p-3 text-sm font-bold text-ember">
            Login password gagal: {searchParams.message ?? "cek email/password."}
          </p>
        ) : null}
        {searchParams?.status === "sent" ? (
          <p className="mt-4 rounded bg-teal/10 p-3 text-sm font-bold text-teal">Magic link sudah dikirim ke email.</p>
        ) : null}
        {searchParams?.status === "demo" ? (
          <p className="mt-4 rounded bg-mango/25 p-3 text-sm font-bold text-ink">
            Supabase belum terbaca oleh deployment ini. Pastikan URL dan publishable key sudah ada di Vercel, lalu redeploy.
          </p>
        ) : null}
        {searchParams?.status === "email" ? (
          <p className="mt-4 rounded bg-mango/25 p-3 text-sm font-bold text-ink">Masukkan email terlebih dahulu.</p>
        ) : null}
        {searchParams?.status === "auth-error" ? (
          <p className="mt-4 rounded bg-ember/10 p-3 text-sm font-bold text-ember">
            Supabase menolak pengiriman email: {searchParams.message ?? "coba lagi beberapa menit lagi."}
          </p>
        ) : null}
        <form action={signInWithPassword} className="mt-6 grid gap-4">
          <label className="grid gap-1 text-sm font-bold text-ink/70">
            Email
            <input name="email" type="email" placeholder="nama@email.com" className="focus-ring rounded border border-ink/15 bg-paper px-3 py-3 text-ink" />
          </label>
          <label className="grid gap-1 text-sm font-bold text-ink/70">
            Password
            <input name="password" type="password" placeholder="Password sementara" className="focus-ring rounded border border-ink/15 bg-paper px-3 py-3 text-ink" />
          </label>
          <button className="focus-ring rounded bg-ink px-4 py-3 font-black text-white shadow-glow" type="submit">
            Masuk
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-ink/35">
          <span className="h-px flex-1 bg-ink/10" />
          atau
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <form action={signInWithEmail} className="grid gap-3">
          <label className="grid gap-1 text-sm font-bold text-ink/70">
            Email magic link
            <input name="email" type="email" placeholder="nama@email.com" className="focus-ring rounded border border-ink/15 bg-white px-3 py-3 text-ink" />
          </label>
          <button className="focus-ring rounded border border-ink/10 bg-white px-4 py-3 font-black text-ink" type="submit">
            Kirim magic link
          </button>
        </form>
      </section>
    </main>
  );
}
