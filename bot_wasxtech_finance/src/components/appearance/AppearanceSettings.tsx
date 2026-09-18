"use client";

import { useState } from "react";
import { DEFAULT_THEME, THEMES } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TypeBadge } from "@/components/ui/Badge";

export function AppearanceSettings() {
  const { theme, savedTheme, saving, preview, cancel, save } = useTheme();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const changed = theme !== savedTheme;
  async function saveSelection() {
    setError(""); setMessage("");
    try { await save(); setMessage("Aparência salva para sua conta."); }
    catch (error) { setError(error instanceof Error ? error.message : "Não foi possível salvar."); }
  }
  return <div className="flex min-w-0 flex-col gap-6">
    <header><h1 className="text-xl font-semibold">Aparência</h1>
      <p className="mt-1 text-sm text-text-muted">Experimente uma paleta. Salve para restaurá-la em outros dispositivos e no próximo login.</p></header>
    <fieldset disabled={saving}><legend className="mb-3 text-sm font-medium">Escolha uma paleta</legend>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">{THEMES.map((palette) =>
        <label key={palette.id} data-theme={palette.id}
          className="min-w-0 cursor-pointer rounded-lg border-2 border-control-border bg-surface p-4 text-text-primary has-[:checked]:outline-2 has-[:checked]:outline-offset-2 has-[:checked]:outline-focus">
          <span className="flex items-center gap-2"><input type="radio" name="theme" value={palette.id} checked={theme === palette.id}
            onChange={() => { preview(palette.id); setMessage(""); setError(""); }} className="h-4 w-4 accent-accent" />
            <span className="font-semibold">{palette.name}</span></span>
          <span className="mt-2 block text-sm text-text-muted">{palette.description}</span>
          <span className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
            <span className="rounded bg-accent px-2 py-1 text-xs text-accent-foreground">Ação</span>
            <span className="rounded bg-income-soft px-2 py-1 text-xs text-income">Receita</span>
            <span className="rounded bg-expense-soft px-2 py-1 text-xs text-expense">Despesa</span>
          </span>
        </label>)}</div>
    </fieldset>
    <Card><h2 className="font-semibold">Preview da paleta selecionada</h2>
      <p className="mt-1 text-sm text-text-muted">A paleta também está aplicada à navegação e aos controles desta página.</p>
      <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div><p className="text-sm text-text-muted">Saldo de exemplo</p><p className="text-2xl font-semibold">R$ 1.250,00</p>
          <div className="mt-3 flex gap-2"><TypeBadge type="INCOME" /><TypeBadge type="EXPENSE" /></div></div>
        <label className="text-sm text-text-muted">Campo de exemplo<Input placeholder="Descrição da movimentação" /></label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2"><Button type="button">Ação de exemplo</Button>
        <Button type="button" variant="secondary">Secundária</Button><Button type="button" disabled>Indisponível</Button></div>
    </Card>
    <div className="flex flex-wrap gap-3"><Button onClick={saveSelection} disabled={saving || !changed}>{saving ? "Salvando…" : "Salvar aparência"}</Button>
      <Button variant="secondary" disabled={saving || !changed} onClick={() => { cancel(); setMessage(""); setError(""); }}>Cancelar preview</Button>
      <Button variant="ghost" disabled={saving} onClick={() => { preview(DEFAULT_THEME); setMessage(""); setError(""); }}>Restaurar tema padrão</Button></div>
    <p className="text-sm text-text-muted" role="status">{message || (changed ? "Preview ativo. A mudança ainda não foi salva." : "Aparência salva aplicada.")}</p>
    {error && <p className="text-sm text-expense" role="alert">{error}</p>}
  </div>;
}
