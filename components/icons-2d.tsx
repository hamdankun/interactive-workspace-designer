import type { ReactNode } from "react";
import type { Accessory, Chair, Desk } from "@/lib/types";

/**
 * Flat schematic icons for the picker grids. These read the same color/shape
 * data the 3D scene uses (lib/catalog.ts), so a thumbnail never visually
 * disagrees with what the live 3D preview shows for the same item.
 */
export function DeskIcon({ desk }: { desk: Desk }) {
  const topWidth = Math.round(90 * desk.width);
  const x = (200 - topWidth) / 2;
  return (
    <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden="true">
      <rect x={x} y={20} width={topWidth} height={10} rx={2} fill={desk.topColor} />
      {desk.legStyle === "center-pole" && (
        <rect x={100 - 4} y={12} width={8} height={58} fill={desk.legColor} />
      )}
      {desk.legStyle === "four-leg" && (
        <>
          <rect x={x + 8} y={30} width={6} height={40} fill={desk.legColor} />
          <rect x={x + topWidth - 14} y={30} width={6} height={40} fill={desk.legColor} />
        </>
      )}
      {desk.legStyle === "trestle" && (
        <>
          <polygon points={`${x + 10},70 ${x + 24},30 ${x + 34},30 ${x + 20},70`} fill={desk.legColor} />
          <polygon points={`${x + topWidth - 10},70 ${x + topWidth - 24},30 ${x + topWidth - 34},30 ${x + topWidth - 20},70`} fill={desk.legColor} />
        </>
      )}
      {desk.legStyle === "l-shape" && (
        <>
          <rect x={x + 8} y={30} width={6} height={40} fill={desk.legColor} />
          <rect x={x + topWidth - 14} y={30} width={6} height={40} fill={desk.legColor} />
          <rect x={x + topWidth - 4} y={20} width={20} height={10} rx={2} fill={desk.topColor} />
        </>
      )}
    </svg>
  );
}

export function ChairIcon({ chair }: { chair: Chair }) {
  const backHeight = Math.round(45 * chair.backHeight);
  return (
    <svg viewBox="0 0 80 100" className="h-full w-full" aria-hidden="true">
      {backHeight > 0 && (
        <rect x={20} y={60 - backHeight} width={40} height={backHeight} rx={4} fill={chair.backColor} />
      )}
      {chair.hasArmrests && (
        <>
          <rect x={10} y={44} width={8} height={20} rx={2} fill={chair.backColor} />
          <rect x={62} y={44} width={8} height={20} rx={2} fill={chair.backColor} />
        </>
      )}
      <rect x={15} y={60} width={50} height={10} rx={2} fill={chair.seatColor} />
      <rect x={35} y={70} width={10} height={15} fill="#57534e" />
      <ellipse cx={40} cy={90} rx={18} ry={5} fill="#57534e" />
    </svg>
  );
}

const ACCESSORY_ICONS: Record<Accessory["id"], (color: string) => ReactNode> = {
  monitor: (color) => (
    <>
      <rect x={8} y={6} width={44} height={30} rx={3} fill="#27272a" />
      <rect x={12} y={10} width={36} height={22} fill={color} />
      <rect x={26} y={36} width={8} height={8} fill="#71717a" />
      <rect x={16} y={44} width={28} height={4} rx={2} fill="#71717a" />
    </>
  ),
  lamp: (color) => (
    <>
      <rect x={10} y={50} width={30} height={5} rx={2} fill="#71717a" />
      <rect x={23} y={20} width={4} height={30} fill="#a1a1aa" />
      <path d="M15 8 L35 8 L30 22 L20 22 Z" fill={color} />
    </>
  ),
  plant: (color) => (
    <>
      <path d="M25 30 C10 28 10 8 20 5 C22 15 25 20 25 30 Z" fill={color} />
      <path d="M25 30 C40 28 40 8 30 5 C28 15 25 20 25 30 Z" fill="#22c55e" />
      <rect x={12} y={30} width={26} height={20} rx={3} fill="#a16207" />
    </>
  ),
  keyboard: (color) => (
    <>
      <rect x={4} y={4} width={52} height={22} rx={3} fill={color} />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <rect key={`${row}-${col}`} x={8 + col * 7} y={8 + row * 6} width={5} height={4} rx={1} fill="#a1a1aa" />
        ))
      )}
    </>
  ),
  mouse: (color) => (
    <>
      <rect x={20} y={6} width={16} height={26} rx={8} fill={color} />
      <rect x={27} y={6} width={2} height={12} fill="#a1a1aa" />
    </>
  ),
  webcam: (color) => (
    <>
      <circle cx={20} cy={20} r={14} fill="#27272a" />
      <circle cx={20} cy={20} r={7} fill={color} />
      <rect x={4} y={26} width={10} height={4} rx={2} fill="#71717a" />
    </>
  ),
  headphones: (color) => (
    <>
      <path d="M8 26 A17 17 0 0 1 42 26" fill="none" stroke={color} strokeWidth={4} />
      <rect x={4} y={24} width={9} height={14} rx={4} fill={color} />
      <rect x={37} y={24} width={9} height={14} rx={4} fill={color} />
    </>
  ),
  bookshelf: (color) => (
    <>
      <rect x={6} y={6} width={38} height={38} fill="none" stroke={color} strokeWidth={3} />
      <rect x={9} y={12} width={4} height={26} fill="#dc2626" />
      <rect x={15} y={12} width={4} height={26} fill="#2563eb" />
      <rect x={21} y={12} width={4} height={26} fill="#16a34a" />
      <rect x={27} y={12} width={4} height={26} fill="#f59e0b" />
    </>
  ),
  whiteboard: (color) => (
    <>
      <rect x={4} y={4} width={42} height={30} rx={2} fill={color} stroke="#a1a1aa" strokeWidth={2} />
      <line x1={10} y1={14} x2={30} y2={14} stroke="#2563eb" strokeWidth={2} />
      <line x1={10} y1={22} x2={24} y2={22} stroke="#dc2626" strokeWidth={2} />
    </>
  ),
};

export function AccessoryIcon({ accessory }: { accessory: Accessory }) {
  return (
    <svg viewBox="0 0 50 60" className="h-full w-full" aria-hidden="true">
      {ACCESSORY_ICONS[accessory.id](accessory.color)}
    </svg>
  );
}
