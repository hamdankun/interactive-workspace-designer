"use client";

import { useEffect, useRef, useState } from "react";
import { buildLineItems, totalPerDay } from "@/lib/catalog";
import type { Selection } from "@/lib/types";

export function CheckoutSummary({
  selection,
  onBack,
  onReset,
}: {
  selection: Selection;
  onBack: () => void;
  onReset: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineItems = buildLineItems(selection);
  const total = totalPerDay(selection);

  // Move focus here on mount, instead of dropping it to <body>, since the
  // build view's controls just unmounted underneath the click that got us here.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  if (confirmed) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">
          You&apos;re all set!
        </h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Your setup is reserved at ${total}/day. monis.rent will reach out to
          arrange delivery.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-lg border border-zinc-300 px-4 py-2 dark:border-zinc-700"
        >
          Design another setup
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">
        Your Setup
      </h2>
      <ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
        {lineItems.map((item) => (
          <li key={item.id} className="flex justify-between py-2 text-sm">
            <span>{item.name}</span>
            <span>${item.price}/day</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between border-t border-zinc-300 pt-4 font-semibold dark:border-zinc-700">
        <span>Total</span>
        <span>${total}/day</span>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 dark:border-zinc-700"
        >
          Back to designing
        </button>
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Rent Your Setup
        </button>
      </div>
    </div>
  );
}
