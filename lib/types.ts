export type DeskVariant =
  | "compact"
  | "standing"
  | "executive"
  | "corner"
  | "writing"
  | "gaming"
  | "adjustable"
  | "glass"
  | "industrial";

export type ChairVariant =
  | "staff"
  | "task"
  | "computer"
  | "mesh"
  | "ergonomic"
  | "drafting"
  | "manager"
  | "executive"
  | "gaming";

export type AccessoryId =
  | "monitor"
  | "lamp"
  | "plant"
  | "keyboard"
  | "webcam"
  | "mouse"
  | "headphones"
  | "bookshelf"
  | "whiteboard";

export type DeskLegStyle = "four-leg" | "center-pole" | "l-shape" | "trestle";

/** How a surface responds to light — drives roughness/metalness/transmission, not just color. */
export type MaterialKind = "wood" | "wood-lacquered" | "laminate" | "metal" | "glass" | "fabric" | "leather" | "plastic";

/** Real office-furniture material tiers (staff/economy, executive/mid, premium). */
export type DeskTier = "staff" | "executive" | "premium";

/** Real office-chair category tiers, per common usage (staff/task, ergonomic/modern, manager/executive). */
export type ChairTier = "staff" | "ergonomic" | "executive";

export type Desk = {
  id: DeskVariant;
  name: string;
  pricePerDay: number;
  tier: DeskTier;
  topColor: string;
  legColor: string;
  topMaterial: MaterialKind;
  legMaterial: MaterialKind;
  /** Real-world material names, shown to the user — e.g. "Particle Board + Melamine". */
  topMaterialLabel: string;
  legMaterialLabel: string;
  /** relative desk width, ~0.8-1.6 */
  width: number;
  legStyle: DeskLegStyle;
};

export type Chair = {
  id: ChairVariant;
  name: string;
  pricePerDay: number;
  tier: ChairTier;
  seatColor: string;
  backColor: string;
  seatMaterial: MaterialKind;
  /** Real-world material name, shown to the user — e.g. "PU Leather, Fabric, Mesh". */
  seatMaterialLabel: string;
  /** relative backrest height, 0 = no backrest */
  backHeight: number;
  hasArmrests: boolean;
  /** multiplies seat height + post length — e.g. a drafting/high chair for standing-height desks. Default 1. */
  seatHeightScale?: number;
};

/**
 * Where an accessory's first unit sits on the desk.
 * x: fraction of the desk's half-width (-1..1, scaled per-desk so it never clips off a narrower desk).
 * y: height above the desk surface, in world units (0 = resting flush on the surface).
 * z: depth offset from desk center, in world units (desk depth doesn't vary by catalog item).
 */
export type DeskSlot = { x: number; y: number; z: number };

export type Accessory = {
  id: AccessoryId;
  name: string;
  pricePerDay: number;
  /** 1 = simple toggle, >1 = quantity stepper (e.g. monitors) */
  maxQuantity: number;
  color: string;
  slot: DeskSlot;
  /** for maxQuantity > 1, how far each extra unit is offset along x */
  spacing?: number;
};

/** quantity per accessory id; missing or 0 = not selected */
export type AccessoryQuantities = Partial<Record<AccessoryId, number>>;

export type Selection = {
  deskId: DeskVariant;
  chairId: ChairVariant;
  accessoryQuantities: AccessoryQuantities;
};

export type Category = "desks" | "chairs" | "accessories";
export type Step = "build" | "checkout";

export type LineItem = { id: string; name: string; quantity: number; price: number };
