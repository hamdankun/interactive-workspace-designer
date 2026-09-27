import type { Accessory, Chair, Desk, LineItem, Selection } from "./types";

// Tiers and material combinations are grounded in how office desks are
// actually specced/sold (staff/economy vs executive vs premium), not
// invented per-item. See docs/superpowers/specs for the source.
export const desks: Desk[] = [
  // Staff tier: particle board + melamine top, PVC edge, steel frame
  {
    id: "compact",
    name: "Compact Desk",
    pricePerDay: 4,
    tier: "staff",
    topColor: "#c9a172",
    legColor: "#52525b",
    topMaterial: "laminate",
    legMaterial: "metal",
    topMaterialLabel: "Particle Board + Melamine",
    legMaterialLabel: "Steel",
    width: 1.0,
    legStyle: "four-leg",
  },
  {
    id: "writing",
    name: "Writing Desk",
    pricePerDay: 5,
    tier: "staff",
    topColor: "#d8c3a5",
    legColor: "#3f3f46",
    topMaterial: "laminate",
    legMaterial: "metal",
    topMaterialLabel: "Particle Board + Melamine",
    legMaterialLabel: "Steel",
    width: 0.9,
    legStyle: "four-leg",
  },
  {
    id: "standing",
    name: "Standing Desk",
    pricePerDay: 7,
    tier: "staff",
    topColor: "#9ca3af",
    legColor: "#4b5563",
    topMaterial: "laminate",
    legMaterial: "metal",
    topMaterialLabel: "Particle Board + Melamine",
    legMaterialLabel: "Steel",
    width: 1.1,
    legStyle: "center-pole",
  },

  // Executive tier: MDF/plywood + veneer/HPL top, PVC/wood edge, steel/wood frame
  {
    id: "industrial",
    name: "Industrial Desk",
    pricePerDay: 6,
    tier: "executive",
    topColor: "#92603a",
    legColor: "#44403c",
    topMaterial: "wood",
    legMaterial: "metal",
    topMaterialLabel: "Plywood + Veneer",
    legMaterialLabel: "Steel",
    width: 1.15,
    legStyle: "trestle",
  },
  {
    id: "gaming",
    name: "Gaming Desk",
    pricePerDay: 8,
    tier: "executive",
    topColor: "#1f2937",
    legColor: "#ef4444",
    topMaterial: "laminate",
    legMaterial: "metal",
    topMaterialLabel: "MDF + HPL",
    legMaterialLabel: "Steel",
    width: 1.2,
    legStyle: "four-leg",
  },
  {
    id: "adjustable",
    name: "Adjustable Standing Desk",
    pricePerDay: 12,
    tier: "executive",
    topColor: "#e5e7eb",
    legColor: "#111827",
    topMaterial: "laminate",
    legMaterial: "metal",
    topMaterialLabel: "MDF + HPL",
    legMaterialLabel: "Steel (motorized)",
    width: 1.2,
    legStyle: "center-pole",
  },

  // Premium tier: solid wood/veneer top with PU coating, solid wood/metal frame
  {
    id: "executive",
    name: "Executive Desk",
    pricePerDay: 9,
    tier: "premium",
    topColor: "#4b3621",
    legColor: "#2a1d10",
    topMaterial: "wood-lacquered",
    legMaterial: "wood-lacquered",
    topMaterialLabel: "Solid Wood (PU Coated)",
    legMaterialLabel: "Solid Wood",
    width: 1.3,
    legStyle: "four-leg",
  },
  {
    id: "corner",
    name: "Corner Desk (L-Shape)",
    pricePerDay: 10,
    tier: "premium",
    topColor: "#8a6a45",
    legColor: "#5c4632",
    topMaterial: "wood-lacquered",
    legMaterial: "wood-lacquered",
    topMaterialLabel: "Solid Wood (PU Coated)",
    legMaterialLabel: "Solid Wood",
    width: 1.2,
    legStyle: "l-shape",
  },
  {
    id: "glass",
    name: "Glass Desk",
    pricePerDay: 11,
    tier: "premium",
    topColor: "#a5c9d1",
    legColor: "#6b7280",
    topMaterial: "glass",
    legMaterial: "metal",
    topMaterialLabel: "Tempered Glass",
    legMaterialLabel: "Steel",
    width: 1.1,
    legStyle: "four-leg",
  },
];

// Categories and materials are grounded in real office-chair classification
// (type -> typical use -> common material), the same way the desk catalog
// is grounded in real desk construction tiers.
export const chairs: Chair[] = [
  // Staff tier: basic day-to-day seating
  {
    id: "staff",
    name: "Office/Staff Chair",
    pricePerDay: 3,
    tier: "staff",
    seatColor: "#6b7280",
    backColor: "#4b5563",
    seatMaterial: "fabric",
    seatMaterialLabel: "Fabric, Mesh, PU",
    backHeight: 0.5,
    hasArmrests: false,
  },
  {
    id: "task",
    name: "Task Chair",
    pricePerDay: 4,
    tier: "staff",
    seatColor: "#78716c",
    backColor: "#57534e",
    seatMaterial: "plastic",
    seatMaterialLabel: "Fabric, Mesh, Plastic",
    backHeight: 0.4,
    hasArmrests: false,
  },
  {
    id: "computer",
    name: "Computer Chair",
    pricePerDay: 5,
    tier: "staff",
    seatColor: "#374151",
    backColor: "#1f2937",
    seatMaterial: "fabric",
    seatMaterialLabel: "Mesh, Fabric, PU",
    backHeight: 0.55,
    hasArmrests: false,
  },

  // Ergonomic tier: modern, computer/desk-focused designs
  {
    id: "mesh",
    name: "Mesh Chair",
    pricePerDay: 6,
    tier: "ergonomic",
    seatColor: "#0891b2",
    backColor: "#0e7490",
    seatMaterial: "fabric",
    seatMaterialLabel: "Mesh + Nylon/Metal",
    backHeight: 0.7,
    hasArmrests: true,
  },
  {
    id: "ergonomic",
    name: "Ergonomic Chair",
    pricePerDay: 7,
    tier: "ergonomic",
    seatColor: "#2563eb",
    backColor: "#1d4ed8",
    seatMaterial: "fabric",
    seatMaterialLabel: "Mesh, Fabric, Foam",
    backHeight: 0.8,
    hasArmrests: true,
  },
  {
    id: "drafting",
    name: "Drafting/High Chair",
    pricePerDay: 8,
    tier: "ergonomic",
    seatColor: "#16a34a",
    backColor: "#15803d",
    seatMaterial: "fabric",
    seatMaterialLabel: "Mesh, Fabric, PU",
    backHeight: 0.55,
    hasArmrests: true,
    // real drafting/high chairs are built taller, for standing-height desks
    seatHeightScale: 1.35,
  },

  // Executive tier: manager/director-grade seating
  {
    id: "manager",
    name: "Manager Chair",
    pricePerDay: 9,
    tier: "executive",
    seatColor: "#713f12",
    backColor: "#854d0e",
    seatMaterial: "leather",
    seatMaterialLabel: "PU Leather, Fabric, Mesh",
    backHeight: 0.85,
    hasArmrests: true,
  },
  {
    id: "executive",
    name: "Executive Chair",
    pricePerDay: 10,
    tier: "executive",
    seatColor: "#92400e",
    backColor: "#78350f",
    seatMaterial: "leather",
    seatMaterialLabel: "Leather, PU Leather, Fabric, Mesh",
    backHeight: 0.95,
    hasArmrests: true,
  },
  {
    id: "gaming",
    name: "Gaming/Hybrid Office Chair",
    pricePerDay: 11,
    tier: "executive",
    seatColor: "#dc2626",
    backColor: "#1f2937",
    seatMaterial: "leather",
    seatMaterialLabel: "PU Leather, Fabric, Foam",
    backHeight: 0.9,
    hasArmrests: true,
  },
];

/** Monitor height (world units) — webcam stacks on top of it, see MONITOR_HEIGHT below. */
export const MONITOR_HEIGHT = 0.368;

export const accessories: Accessory[] = [
  {
    id: "monitor",
    name: "Monitor",
    pricePerDay: 3,
    maxQuantity: 2,
    color: "#38bdf8",
    // x/spacing must clear the monitor's bezel width (0.468) or the two
    // screens interpenetrate (has happened twice when the bezel grew) -
    // 0.39/0.78 is the tightest gap that still clears it on every desk,
    // including the narrowest (Writing Desk).
    slot: { x: -0.39, y: 0, z: -0.15 },
    spacing: 0.78,
  },
  {
    id: "lamp",
    name: "Desk Lamp",
    pricePerDay: 1,
    maxQuantity: 1,
    color: "#f59e0b",
    slot: { x: 0.7, y: 0, z: -0.18 },
  },
  {
    id: "plant",
    name: "Plant",
    pricePerDay: 1,
    maxQuantity: 1,
    color: "#16a34a",
    slot: { x: -0.7, y: 0, z: -0.12 },
  },
  {
    id: "keyboard",
    name: "Keyboard",
    pricePerDay: 2,
    maxQuantity: 1,
    color: "#1f2937",
    slot: { x: 0, y: 0, z: 0.22 },
  },
  {
    id: "mouse",
    name: "Mouse",
    pricePerDay: 1,
    maxQuantity: 1,
    color: "#374151",
    // 0.22 put it inside the keyboard's own footprint on narrower desks
    // (keyboard is a fixed absolute width; mouse's x scales with desk
    // width, so the gap between them shrinks on a narrow desk) - widened
    // so it clears the keyboard even on the narrowest desk.
    slot: { x: 0.4, y: 0, z: 0.22 },
  },
  {
    id: "webcam",
    name: "Webcam",
    pricePerDay: 2,
    maxQuantity: 1,
    color: "#374151",
    // x is ignored - Scene3D derives it from the monitor's actual position
    // (see unitX/webcam special-case there) so it can't drift out of sync
    // with the monitor again the way a second hardcoded value did.
    slot: { x: 0, y: MONITOR_HEIGHT, z: -0.15 },
  },
  {
    id: "headphones",
    name: "Headphones",
    pricePerDay: 2,
    maxQuantity: 1,
    color: "#1f2937",
    slot: { x: 0.45, y: 0, z: -0.2 },
  },
  {
    id: "bookshelf",
    name: "Bookshelf",
    pricePerDay: 3,
    maxQuantity: 1,
    color: "#7c4a2d",
    slot: { x: -0.55, y: 0, z: -0.22 },
  },
  {
    id: "whiteboard",
    name: "Whiteboard",
    pricePerDay: 4,
    maxQuantity: 1,
    color: "#f4f4f5",
    slot: { x: 0, y: 0, z: -0.3 },
  },
];

export function findDesk(id: Desk["id"]): Desk {
  return desks.find((d) => d.id === id) ?? desks[0];
}

export function findChair(id: Chair["id"]): Chair {
  return chairs.find((c) => c.id === id) ?? chairs[0];
}

export function findAccessory(id: Accessory["id"]): Accessory | undefined {
  return accessories.find((a) => a.id === id);
}

export function accessoryQuantity(
  selection: Selection,
  id: Accessory["id"],
): number {
  return selection.accessoryQuantities[id] ?? 0;
}

export const defaultSelection: Selection = {
  deskId: desks[0].id,
  chairId: chairs[0].id,
  accessoryQuantities: {},
};

/** Single source of truth for what's billed: the checkout list and the total both derive from this. */
export function buildLineItems(selection: Selection): LineItem[] {
  const desk = findDesk(selection.deskId);
  const chair = findChair(selection.chairId);
  const items: LineItem[] = [
    {
      id: `desk:${desk.id}`,
      name: desk.name,
      quantity: 1,
      price: desk.pricePerDay,
    },
    {
      id: `chair:${chair.id}`,
      name: chair.name,
      quantity: 1,
      price: chair.pricePerDay,
    },
  ];
  for (const accessory of accessories) {
    const quantity = accessoryQuantity(selection, accessory.id);
    if (quantity > 0) {
      const name =
        quantity > 1 ? `${accessory.name} x${quantity}` : accessory.name;
      items.push({
        id: `accessory:${accessory.id}`,
        name,
        quantity,
        price: accessory.pricePerDay * quantity,
      });
    }
  }
  return items;
}

export function totalPerDay(selection: Selection): number {
  return buildLineItems(selection).reduce((sum, item) => sum + item.price, 0);
}
