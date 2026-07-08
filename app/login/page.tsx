import { Mail } from "lucide-react";
import { signInWithEmail } from "@/app/login/actions";

export default function LoginPage({ searchParams }: { searchParams?: { status?: string } }) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded border border-ink/10 bg-white p-6 shadow-sm">
        <div className="grid h-12 w-12 place-items-center rounded bg-ember text-white">
          <Mail size={22} />
        </div>
        <h1 className="mt-5 text-3xl font-black text-ink">Masuk anggota</h1>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          Hubungkan Supabase Auth untuk mengaktifkan email login. Akun baru akan menunggu approval admin.
        </p>
        {searchParams?.status === "sent" ? (
          <p className="mt-4 rounded bg-teal/10 p-3 text-sm font-bold text-teal">Magic link sudah dikirim ke email.</p>
        ) : null}
        {searchParams?.status === "demo" ? (
          <p className="mt-4 rounded bg-mango/25 p-3 text-sm font-bold text-ink">Isi Supabase env vars untuk mengaktifkan login.</p>
        ) : null}
        <form action={signInWithEmail} className="mt-6 grid gap-4">
          <label className="grid gap-1 text-sm font-bold text-ink/70">
            Email
            <input type="email" placeholder="nama@email.com" className="focus-ring rounded border border-ink/15 bg-paper px-3 py-3 text-ink" />
          </label>
          <button className="focus-ring rounded bg-ember px-4 py-3 font-black text-white shadow-glow" type="submit">
            Kirim magic link
          </button>
        </form>
      </section>
    </main>
  );
}
