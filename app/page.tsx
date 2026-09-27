import { WorkspaceDesigner } from "@/components/workspace-designer";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Design Your Workspace</h1>
      <p className="mt-1 text-zinc-500 dark:text-zinc-400">
        Pick a desk, a chair, and the accessories you need — then rent it.
      </p>
      <div className="mt-8">
        <WorkspaceDesigner />
      </div>
    </main>
  );
}
