"use client";

import { useEffect, useRef, useState } from "react";
import { chairs, defaultSelection, desks } from "@/lib/catalog";
import type { Category, Selection, Step } from "@/lib/types";
import { AccessoryControls } from "./accessory-controls";
import { CategoryTabs } from "./category-tabs";
import { CheckoutSummary } from "./checkout-summary";
import { ChairIcon, DeskIcon } from "./icons-2d";
import { SelectableGrid } from "./selectable-grid";
import { WorkspacePreview } from "./workspace-preview";

export function WorkspaceDesigner() {
  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const [category, setCategory] = useState<Category>("desks");
  const [step, setStep] = useState<Step>("build");
  const buildRef = useRef<HTMLDivElement>(null);

  // Move focus to the view that just became visible, instead of dropping it
  // to <body>, when switching between the build and checkout steps.
  useEffect(() => {
    if (step === "build") buildRef.current?.focus();
  }, [step]);

  if (step === "checkout") {
    return (
      <CheckoutSummary
        selection={selection}
        onBack={() => setStep("build")}
        onReset={() => {
          setSelection(defaultSelection);
          setStep("build");
        }}
      />
    );
  }

  return (
    <div ref={buildRef} tabIndex={-1} className="grid gap-8 outline-none md:grid-cols-2">
      <div>
        <CategoryTabs active={category} onChange={setCategory} />
        <div className="mt-4">
          {category === "desks" && (
            <SelectableGrid
              items={desks}
              selectedId={selection.deskId}
              onSelect={(deskId) => setSelection((s) => ({ ...s, deskId }))}
              renderIllustration={(item) => <DeskIcon desk={item} />}
              renderDetail={(item) => `${item.topMaterialLabel} · ${item.legMaterialLabel} frame`}
            />
          )}
          {category === "chairs" && (
            <SelectableGrid
              items={chairs}
              selectedId={selection.chairId}
              onSelect={(chairId) => setSelection((s) => ({ ...s, chairId }))}
              renderIllustration={(item) => <ChairIcon chair={item} />}
              renderDetail={(item) => item.seatMaterialLabel}
            />
          )}
          {category === "accessories" && (
            <AccessoryControls selection={selection} onChange={setSelection} />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <WorkspacePreview selection={selection} />
        <button
          type="button"
          onClick={() => setStep("checkout")}
          className="w-full max-w-xl rounded-lg bg-zinc-900 px-4 py-3 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Rent Your Setup
        </button>
      </div>
    </div>
  );
}
