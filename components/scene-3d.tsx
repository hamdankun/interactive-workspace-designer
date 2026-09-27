"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { accessories, accessoryQuantity, findChair, findDesk } from "@/lib/catalog";
import type { Accessory, Selection } from "@/lib/types";
import { AccessoryModel, ChairModel, DeskModel, DESK_SURFACE_Y, deskHalfWidth } from "./models-3d";

/**
 * x-fraction (before *halfWidth scaling) of one unit in a group of
 * `quantity` copies of `accessory`, keeping the whole group centered on
 * accessory.slot.x + spacing/2 regardless of quantity - 1 monitor centers,
 * 2 sit symmetric either side, etc.
 */
function unitX(accessory: Accessory, quantity: number, index: number): number {
  const spacing = accessory.spacing ?? 0;
  const groupCenterX = accessory.slot.x + spacing / 2;
  return groupCenterX + (index - (quantity - 1) / 2) * spacing;
}

export function Scene3D({ selection }: { selection: Selection }) {
  const desk = findDesk(selection.deskId);
  const chair = findChair(selection.chairId);
  const halfWidth = deskHalfWidth(desk);
  const monitor = accessories.find((a) => a.id === "monitor")!;
  const monitorQuantity = accessoryQuantity(selection, "monitor");

  return (
    <div className="relative aspect-square w-full max-w-xl overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <Canvas shadows camera={{ position: [2.4, 1.9, 2.8], fov: 32 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-3, 2, -2]} intensity={0.25} />

        <group position={[0, 0, -0.3]}>
          <DeskModel desk={desk} />
          <group position={[0, 0, 0.55]}>
            <ChairModel chair={chair} />
          </group>
          {accessories.map((accessory) => {
            const quantity = accessoryQuantity(selection, accessory.id);
            if (quantity === 0) return null;
            return Array.from({ length: quantity }).map((_, i) => {
              // The webcam sits on the first monitor, so its x tracks
              // wherever that monitor actually renders (which depends on
              // monitor quantity) instead of a second hardcoded position
              // that has to be kept in sync by hand - that's what drifted
              // out of alignment just now when monitor centering changed.
              const x =
                accessory.id === "webcam"
                  ? unitX(monitor, monitorQuantity, 0) * halfWidth
                  : unitX(accessory, quantity, i) * halfWidth;
              return (
                <group
                  key={`${accessory.id}-${i}`}
                  position={[x, DESK_SURFACE_Y + accessory.slot.y, accessory.slot.z]}
                >
                  <AccessoryModel id={accessory.id} color={accessory.color} />
                </group>
              );
            });
          })}
        </group>

        {/* floor - grounds the scene instead of leaving the furniture floating in a void */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#d4d4d8" roughness={0.9} metalness={0} />
        </mesh>

        <OrbitControls
          target={[0, 0.55, 0.3]}
          enablePan={false}
          minDistance={2.6}
          maxDistance={4.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.15}
        />
      </Canvas>
    </div>
  );
}
