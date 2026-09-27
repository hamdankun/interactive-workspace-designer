# Interactive Workspace Designer

A visual configurator built for the Desent Solutions / monis.rent developer
challenge: pick a desk, pick a chair, add accessories, watch the setup come
together live, then review it in a checkout view.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Approach

Everything is client-side state on one route — no backend, no database, since
nothing in the brief needed persistence. A single `WorkspaceDesigner`
component owns the selection (desk, chair, accessories) and the current step
(build vs. checkout); everything else is a small, presentational component
driven by props off that one state object. The catalog (9 desks, 9 chairs, 9
accessories, all with prices) is static, data-driven content in
`lib/catalog.ts` — a new item is a data row, not new component code, since
desks/chairs are described by color/size/leg-style fields and accessories
carry their own desk-relative 3D placement (`slot`).

The live preview is a real 3D scene (procedural geometry — boxes, cylinders,
cones — composed with `three` + `@react-three/fiber` + `@react-three/drei`),
not product photos or flat illustrations, so it composites cleanly no matter
what's selected and needs no external asset files. Every accessory is
anchored to the desk surface and scaled by the desk's own width, so it can't
drift off a narrower desk. Picker grid thumbnails stay flat 2D SVG icons
(`components/icons-2d.tsx`) — 27 cards each running their own WebGL canvas
would be wasteful for something you just glance at to compare options.

## Tech choices

Next.js (App Router) + Tailwind CSS + TypeScript, per the brief's required
stack, deployed on Vercel, plus `three`/`@react-three/fiber`/`@react-three/drei`
for the 3D preview. No other additional dependencies — state management and
drag-and-drop were optional and plain `useState` covered everything else the
must-haves asked for.

## What I'd improve with more time

- More detailed 3D models (rounded edges, materials/textures) instead of
  flat-shaded primitives.
- Persisting/sharing a configuration via a URL so a setup can be bookmarked
  or sent to someone else.
- Real pricing and a real checkout/payment flow instead of a mocked total
  and confirmation state.
- The bonus categories from the original sketch (coffee station, relax
  zone, etc.) if the scope grew further.
