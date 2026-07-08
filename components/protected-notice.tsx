import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export function ProtectedNotice({ title, message }: { title: string; message: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded border border-ink/10 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded bg-ink text-white">
          <LockKeyhole size={24} />
        </div>
        <h1 className="mt-5 text-3xl font-black text-ink">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">{message}</p>
        <Link
          href="/login"
          className="focus-ring mt-6 inline-flex rounded bg-ember px-5 py-3 text-sm font-black text-white shadow-glow"
        >
          Masuk / Daftar
        </Link>
      </div>
    </section>
  );
}
