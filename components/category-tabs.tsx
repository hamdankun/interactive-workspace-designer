"use client";

import type { Category } from "@/lib/types";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "desks", label: "Desks" },
  { id: "chairs", label: "Chairs" },
  { id: "accessories", label: "Accessories" },
];

export function CategoryTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (category: Category) => void;
}) {
  return (
    <div role="tablist" className="flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          onClick={() => onChange(category.id)}
          aria-selected={active === category.id}
          className={`-mb-px shrink-0 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            active === category.id
              ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
