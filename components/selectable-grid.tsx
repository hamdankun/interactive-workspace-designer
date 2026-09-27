"use client";

import type { ReactNode } from "react";

type SelectableItem = { id: string; name: string; pricePerDay: number };

export function SelectableGrid<T extends SelectableItem>({
  items,
  selectedId,
  onSelect,
  renderIllustration,
  renderDetail,
}: {
  items: T[];
  selectedId: T["id"];
  onSelect: (id: T["id"]) => void;
  renderIllustration: (item: T) => ReactNode;
  /** Optional extra line under the price — e.g. real material spec for desks. */
  renderDetail?: (item: T) => ReactNode;
}) {
  return (
    <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            onClick={() => onSelect(item.id)}
            aria-checked={selected}
            className={`rounded-lg border-2 p-3 text-left transition-colors ${
              selected
                ? "border-zinc-900 dark:border-zinc-50"
                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800"
            }`}
          >
            <div className="h-16">{renderIllustration(item)}</div>
            <p className="mt-2 text-sm font-medium">{item.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">${item.pricePerDay}/day</p>
            {renderDetail && <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{renderDetail(item)}</p>}
          </button>
        );
      })}
    </div>
  );
}
