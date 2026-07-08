"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";

const sharpKeys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatToSharp: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#"
};

function normalizeRoot(root: string) {
  return flatToSharp[root] ?? root;
}

function transposeChord(chord: string, steps: number) {
  return chord.replace(/^([A-G](?:#|b)?)(.*)$/, (_, root: string, suffix: string) => {
    const normalized = normalizeRoot(root);
    const index = sharpKeys.indexOf(normalized);
    if (index === -1) return chord;
    return `${sharpKeys[(index + steps + 120) % 12]}${suffix}`;
  });
}

function transposeText(text: string, steps: number) {
  return text.replace(/\b([A-G](?:#|b)?(?:m|maj|min|sus|dim|aug|add)?[0-9]*(?:\/[A-G](?:#|b)?)?)\b/g, (match) => {
    if (match.includes("/")) {
      const [base, bass] = match.split("/");
      return `${transposeChord(base, steps)}/${transposeChord(bass, steps)}`;
    }
    return transposeChord(match, steps);
  });
}

export function ChordTransposer({ chordText, originalKey }: { chordText: string; originalKey?: string }) {
  const [mode, setMode] = useState<"original" | "transpose">("original");
  const [steps, setSteps] = useState(0);
  const transposed = useMemo(() => transposeText(chordText, steps), [chordText, steps]);
  const keyIndex = originalKey ? sharpKeys.indexOf(normalizeRoot(originalKey)) : -1;
  const currentKey = keyIndex >= 0 ? sharpKeys[(keyIndex + steps + 120) % 12] : originalKey;

  const visibleText = mode === "original" ? chordText : transposed;

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded border border-ink/10 bg-white/80 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">Chord + Lyrics</p>
          <p className="mt-1 text-sm font-bold text-graphite/70">
            Original draft keeps spacing exactly as typed. Transpose is optional and may adjust chord-like text.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("original")}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-black ${mode === "original" ? "bg-ink text-white" : "bg-white text-ink"}`}
          >
            Original Draft
          </button>
          <button
            type="button"
            onClick={() => setMode("transpose")}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-black ${mode === "transpose" ? "bg-ink text-white" : "bg-white text-ink"}`}
          >
            Transpose
          </button>
        </div>
      </div>
      {mode === "transpose" ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded border border-ink/10 bg-white p-3">
          <p className="text-sm font-bold text-graphite/70">
            Original: {originalKey || "-"} {currentKey ? `- Sekarang: ${currentKey}` : ""}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSteps((value) => value - 1)} className="focus-ring grid h-9 w-9 place-items-center rounded-full bg-ink text-white" aria-label="Transpose down">
              <Minus size={16} />
            </button>
            <span className="min-w-10 text-center text-sm font-black text-ink">{steps > 0 ? `+${steps}` : steps}</span>
            <button type="button" onClick={() => setSteps((value) => value + 1)} className="focus-ring grid h-9 w-9 place-items-center rounded-full bg-ink text-white" aria-label="Transpose up">
              <Plus size={16} />
            </button>
          </div>
        </div>
      ) : null}
      <div className="mt-4 max-w-full overflow-x-auto rounded bg-ink">
        <pre className="inline-block min-h-[520px] min-w-full whitespace-pre p-4 font-mono text-[13px] leading-7 text-white sm:p-6 sm:text-base sm:leading-8">{visibleText}</pre>
      </div>
    </div>
  );
}
