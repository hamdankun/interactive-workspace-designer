"use client";

import { accessories } from "@/lib/catalog";
import type { AccessoryId, Selection } from "@/lib/types";
import { AccessoryIcon } from "./icons-2d";

export function AccessoryControls({
  selection,
  onChange,
}: {
  selection: Selection;
  onChange: (next: Selection) => void;
}) {
  const setQuantity = (id: AccessoryId, quantity: number) =>
    onChange({
      ...selection,
      accessoryQuantities: { ...selection.accessoryQuantities, [id]: quantity },
    });

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {accessories.map((accessory) => {
        const quantity = selection.accessoryQuantities[accessory.id] ?? 0;

        if (accessory.maxQuantity > 1) {
          const options = Array.from({ length: accessory.maxQuantity + 1 }, (_, n) => n);
          return (
            <div key={accessory.id} className="rounded-lg border-2 border-zinc-200 p-3 dark:border-zinc-800">
              <div className="h-16">
                <AccessoryIcon accessory={accessory} />
              </div>
              <p className="mt-2 text-sm font-medium">{accessory.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">${accessory.pricePerDay}/day each</p>
              <div role="radiogroup" aria-label={`${accessory.name} quantity`} className="mt-2 flex gap-1">
                {options.map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={quantity === n}
                    onClick={() => setQuantity(accessory.id, n)}
                    className={`flex-1 rounded px-2 py-1 text-xs ${
                      quantity === n
                        ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                        : "bg-zinc-100 dark:bg-zinc-800"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        const active = quantity > 0;
        return (
          <button
            key={accessory.id}
            type="button"
            onClick={() => setQuantity(accessory.id, active ? 0 : 1)}
            aria-pressed={active}
            className={`rounded-lg border-2 p-3 text-left transition-colors ${
              active
                ? "border-zinc-900 dark:border-zinc-50"
                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800"
            }`}
          >
            <div className="h-16">
              <AccessoryIcon accessory={accessory} />
            </div>
            <p className="mt-2 text-sm font-medium">{accessory.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">${accessory.pricePerDay}/day</p>
          </button>
        );
      })}
    </div>
  );
}
