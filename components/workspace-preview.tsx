"use client";

import dynamic from "next/dynamic";
import type { Selection } from "@/lib/types";

// Three.js/WebGL only exists in the browser — load it client-only so the
// server render (and hydration) never has to deal with a canvas.
const Scene3D = dynamic(() => import("./scene-3d").then((m) => m.Scene3D), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-xl animate-pulse rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />
  ),
});

export function WorkspacePreview({ selection }: { selection: Selection }) {
  return <Scene3D selection={selection} />;
}
