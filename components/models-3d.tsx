import { RoundedBox } from "@react-three/drei";
import type { ReactElement } from "react";
import type { Accessory, Chair, Desk, MaterialKind } from "@/lib/types";

/** Height of the desk's top surface above the ground, in world units. */
export const DESK_SURFACE_Y = 0.75;
const DESK_TOP_THICKNESS = 0.06;
const DESK_DEPTH = 0.7;
const CHAIR_SEAT_Y = 0.46;

/** How far a desk's surface extends from its own center — used to keep accessories on the surface regardless of desk width. */
export function deskHalfWidth(desk: Desk): number {
  return 0.7 * desk.width;
}

/** How a material responds to light — this (not just color) is most of what reads as "realistic". */
const MATERIAL_PROPS: Record<MaterialKind, { roughness: number; metalness: number; opacity?: number }> = {
  wood: { roughness: 0.75, metalness: 0 },
  // PU-coated solid wood (premium tier) - noticeably glossier than plain veneer/wood.
  "wood-lacquered": { roughness: 0.4, metalness: 0.04 },
  // Melamine/HPL over particle board or MDF (staff/economy and gaming desktops) - smooth factory finish, no grain sheen.
  laminate: { roughness: 0.5, metalness: 0.04 },
  metal: { roughness: 0.3, metalness: 0.8 },
  glass: { roughness: 0.05, metalness: 0.2, opacity: 0.55 },
  fabric: { roughness: 0.85, metalness: 0 },
  leather: { roughness: 0.4, metalness: 0.05 },
  plastic: { roughness: 0.5, metalness: 0.1 },
};

/** A slightly-rounded box (not a hard-edged one) with a material that actually behaves like its name. */
function Box({
  args,
  position,
  rotation,
  color,
  material,
  radius,
}: {
  args: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  material: MaterialKind;
  /** Explicit corner radius for a deliberately soft/cushioned shape (e.g. a seat). Defaults to a small safe bevel. */
  radius?: number;
}) {
  const { roughness, metalness, opacity } = MATERIAL_PROPS[material];
  const safeMax = Math.min(...args) * 0.48;
  const r = Math.min(radius ?? 0.015, safeMax);
  return (
    <RoundedBox
      args={args}
      radius={r}
      smoothness={4}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        transparent={opacity !== undefined}
        opacity={opacity ?? 1}
      />
    </RoundedBox>
  );
}

export function DeskModel({ desk }: { desk: Desk }) {
  const topWidth = 1.4 * desk.width;
  const legHeight = DESK_SURFACE_Y - DESK_TOP_THICKNESS;
  const halfWidth = deskHalfWidth(desk);
  const legZ = DESK_DEPTH / 2 - 0.08;
  const legX = halfWidth - 0.1;
  const legMat = MATERIAL_PROPS[desk.legMaterial];

  return (
    <group>
      <Box
        args={[topWidth, DESK_TOP_THICKNESS, DESK_DEPTH]}
        position={[0, DESK_SURFACE_Y - DESK_TOP_THICKNESS / 2, 0]}
        color={desk.topColor}
        material={desk.topMaterial}
      />

      {(desk.legStyle === "four-leg" || desk.legStyle === "l-shape") && (
        <>
          <Box args={[0.06, legHeight, 0.06]} position={[-legX, legHeight / 2, -legZ]} color={desk.legColor} material={desk.legMaterial} />
          <Box args={[0.06, legHeight, 0.06]} position={[legX, legHeight / 2, -legZ]} color={desk.legColor} material={desk.legMaterial} />
          <Box args={[0.06, legHeight, 0.06]} position={[-legX, legHeight / 2, legZ]} color={desk.legColor} material={desk.legMaterial} />
          <Box args={[0.06, legHeight, 0.06]} position={[legX, legHeight / 2, legZ]} color={desk.legColor} material={desk.legMaterial} />
        </>
      )}
      {desk.legStyle === "l-shape" && (
        <>
          {/* perpendicular return, attached at the right end (beside the chair), extending forward so it's actually visible instead of tucked behind the main top */}
          <Box
            args={[0.4, DESK_TOP_THICKNESS, 0.9]}
            position={[halfWidth - 0.15, DESK_SURFACE_Y - DESK_TOP_THICKNESS / 2, 0.75]}
            color={desk.topColor}
            material={desk.topMaterial}
          />
          <Box args={[0.06, legHeight, 0.06]} position={[halfWidth - 0.15, legHeight / 2, 1.1]} color={desk.legColor} material={desk.legMaterial} />
        </>
      )}
      {desk.legStyle === "center-pole" && (
        <>
          <mesh position={[-halfWidth * 0.45, legHeight / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.06, legHeight, 16]} />
            <meshStandardMaterial color={desk.legColor} roughness={legMat.roughness} metalness={legMat.metalness} />
          </mesh>
          <mesh position={[halfWidth * 0.45, legHeight / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.06, legHeight, 16]} />
            <meshStandardMaterial color={desk.legColor} roughness={legMat.roughness} metalness={legMat.metalness} />
          </mesh>
        </>
      )}
      {desk.legStyle === "trestle" && (
        <>
          <Box args={[0.45, legHeight, 0.05]} position={[-legX, legHeight / 2, 0]} color={desk.legColor} material={desk.legMaterial} />
          <Box args={[0.45, legHeight, 0.05]} position={[legX, legHeight / 2, 0]} color={desk.legColor} material={desk.legMaterial} />
        </>
      )}
    </group>
  );
}

export function ChairModel({ chair }: { chair: Chair }) {
  // A real office chair's back rises above its seat, but the first rescale
  // (0.34 + backHeight*0.56) overshot — the tallest chairs' backs clipped out
  // of the camera frame. Retuned so the top of the back ranges roughly
  // 0.86-1.16 (about 1.15x-1.55x desk height), not 0.92-1.36.
  const hasBack = chair.backHeight > 0;
  const backHeight = hasBack ? 0.1 + chair.backHeight * 0.6 : 0;
  const metal = MATERIAL_PROPS.metal;
  // A real drafting/high chair is built taller for standing-height desks -
  // scale the seat height (and the post that holds it up) rather than
  // giving it the same seat height as every other chair.
  const seatY = CHAIR_SEAT_Y * (chair.seatHeightScale ?? 1);

  return (
    <group>
      <Box
        args={[0.46, 0.13, 0.46]}
        position={[0, seatY, 0]}
        color={chair.seatColor}
        material={chair.seatMaterial}
        radius={0.06}
      />
      {hasBack && (
        <Box
          args={[0.42, backHeight, 0.11]}
          position={[0, seatY + backHeight / 2, 0.21]}
          color={chair.backColor}
          material={chair.seatMaterial}
          radius={0.05}
        />
      )}
      {chair.hasArmrests && (
        <>
          <Box args={[0.05, 0.18, 0.32]} position={[-0.24, seatY + 0.11, 0]} color="#27272a" material="plastic" radius={0.02} />
          <Box args={[0.05, 0.18, 0.32]} position={[0.24, seatY + 0.11, 0]} color="#27272a" material="plastic" radius={0.02} />
        </>
      )}

      {/* gas-lift post */}
      <mesh position={[0, seatY * 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.033, seatY * 0.9, 12]} />
        <meshStandardMaterial color="#3f3f46" roughness={metal.roughness} metalness={metal.metalness} />
      </mesh>
      {/* five-point swivel base */}
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.05, 12]} />
        <meshStandardMaterial color="#27272a" roughness={metal.roughness} metalness={metal.metalness} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const armLength = 0.24;
        return (
          <group key={i} rotation={[0, -angle, 0]}>
            <Box args={[armLength, 0.03, 0.03]} position={[armLength * 0.5, 0.03, 0]} color="#27272a" material="plastic" />
            <mesh position={[armLength, 0.028, 0]} castShadow>
              <sphereGeometry args={[0.028, 10, 10]} />
              <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Every model's local origin is its own base (y=0 = resting on whatever
 * surface it's placed on), so the scene can position it with a single
 * height offset instead of per-item fudge factors.
 */
const ACCESSORY_MODELS: Record<Accessory["id"], (color: string) => ReactElement> = {
  monitor: (color) => (
    <group>
      {/* flat silver base plate */}
      <Box args={[0.26, 0.025, 0.18]} position={[0, 0.0125, 0]} color="#a1a1aa" material="metal" radius={0.008} />
      {/* neck shortened 30% (0.14->0.098) - screen assembly below is shifted down to match, so it still connects with no gap */}
      <Box args={[0.055, 0.098, 0.055]} position={[0, 0.074, 0]} color="#a1a1aa" material="metal" radius={0.016} />
      {/* tilt-hinge knob - offset to the side and kept below the bezel, so it can never poke through the screen */}
      <mesh position={[0.05, 0.085, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.03, 12]} />
        <meshStandardMaterial color="#a1a1aa" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* frame - widened 30% (0.36->0.468) so the panel reads as widescreen, not square; uniform silver like the reference */}
      <Box args={[0.468, 0.26, 0.025]} position={[0, 0.238, -0.01]} color="#9ca3af" material="metal" radius={0.014} />
      {/* screen: dark charcoal like a real panel, only a faint color tint instead of a solid saturated fill */}
      <mesh position={[0, 0.238, 0.008]}>
        <boxGeometry args={[0.418, 0.21, 0.004]} />
        <meshStandardMaterial color="#27272a" emissive={color} emissiveIntensity={0.12} roughness={0.25} metalness={0.05} />
      </mesh>
    </group>
  ),
  lamp: (color) => (
    <group>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
        <meshStandardMaterial color="#52525b" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.38, 8]} />
        <meshStandardMaterial color="#71717a" roughness={0.3} metalness={0.75} />
      </mesh>
      <mesh position={[0.1, 0.4, 0]} rotation={[0, 0, -0.6]} castShadow>
        <coneGeometry args={[0.08, 0.16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  ),
  plant: (color) => (
    <group>
      <Box args={[0.16, 0.12, 0.16]} position={[0, 0.06, 0]} color="#92603a" material="plastic" />
      <mesh position={[-0.03, 0.18, 0]} castShadow>
        <coneGeometry args={[0.07, 0.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0.04, 0.15, 0.02]} castShadow>
        <coneGeometry args={[0.06, 0.16, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
    </group>
  ),
  keyboard: (color) => (
    <group>
      <Box args={[0.34, 0.03, 0.13]} position={[0, 0.015, 0]} color={color} material="plastic" />
      <Box args={[0.3, 0.006, 0.1]} position={[0, 0.033, 0]} color="#a1a1aa" material="plastic" />
    </group>
  ),
  mouse: (color) => (
    <group>
      {/* low, flat, elongated body - a real mouse is much wider/longer than it is tall */}
      <mesh position={[0, 0.022, 0]} scale={[0.05, 0.022, 0.075]} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
      {/* left/right button split line */}
      <Box args={[0.003, 0.002, 0.04]} position={[0, 0.043, 0.015]} color="#111827" material="plastic" radius={0} />
      {/* scroll wheel */}
      <mesh position={[0, 0.04, -0.005]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.012, 8]} />
        <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  ),
  webcam: (color) => (
    <group>
      <mesh position={[0, 0.02, 0]} castShadow>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, 0.03]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.2} />
      </mesh>
    </group>
  ),
  headphones: (color) => (
    <group>
      {/* rounded ear cup discs, not flat cubes - facing outward to the sides */}
      <mesh position={[-0.09, 0.08, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.035, 20]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[0.09, 0.08, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.035, 20]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
      {/* headband - upright arc over the top, ends level with the ear cups (was tipped flat before) */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <torusGeometry args={[0.09, 0.012, 8, 20, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  ),
  bookshelf: (color) => (
    <group>
      <Box args={[0.02, 0.12, 0.12]} position={[-0.09, 0.06, 0]} color={color} material="wood" />
      <Box args={[0.02, 0.12, 0.12]} position={[0.09, 0.06, 0]} color={color} material="wood" />
      {[-0.055, -0.018, 0.018, 0.055].map((x, i) => (
        <Box
          key={x}
          args={[0.03, 0.11, 0.1]}
          position={[x, 0.055, 0]}
          color={["#dc2626", "#2563eb", "#16a34a", "#f59e0b"][i]}
          material="plastic"
        />
      ))}
    </group>
  ),
  whiteboard: (color) => (
    <group>
      <Box args={[0.02, 0.02, 0.1]} position={[-0.15, 0.01, 0]} color="#71717a" material="metal" />
      <Box args={[0.02, 0.02, 0.1]} position={[0.15, 0.01, 0]} color="#71717a" material="metal" />
      <Box args={[0.36, 0.24, 0.015]} position={[0, 0.18, 0]} color={color} material="plastic" />
    </group>
  ),
};

export function AccessoryModel({ id, color }: { id: Accessory["id"]; color: string }) {
  return ACCESSORY_MODELS[id](color);
}
