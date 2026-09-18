"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return <div role="alert" className="rounded-lg border border-border bg-surface p-5">
    <h1 className="font-semibold">Não foi possível carregar a administração.</h1>
    <button onClick={reset} className="mt-3 rounded-md border border-border px-4 py-2 text-sm">Tentar novamente</button>
  </div>;
}
