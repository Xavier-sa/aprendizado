"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Theme } from "@/lib/themes";

type ThemeContext = { theme: Theme; savedTheme: Theme; saving: boolean;
  preview: (theme: Theme) => void; cancel: () => void; save: () => Promise<void> };
const Context = createContext<ThemeContext | null>(null);

export function ThemeProvider({ initialTheme, children }: { initialTheme: Theme; children: ReactNode }) {
  const [theme, setTheme] = useState(initialTheme);
  const [savedTheme, setSavedTheme] = useState(initialTheme);
  const [saving, setSaving] = useState(false);
  // Scope is already themed by SSR; keep the canvas/native scrollbars in sync.
  // Leaving authenticated layouts restores the public Papiro default.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    return () => { delete document.documentElement.dataset.theme; };
  }, [theme]);
  async function save() {
    const selected = theme;
    setSaving(true);
    try {
      const response = await fetch("/api/settings/appearance", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selected }),
      });
      if (!response.ok) throw new Error(response.status === 401 ? "Sua sessão expirou. Entre novamente." : "Não foi possível salvar a aparência.");
      setSavedTheme(selected);
    } finally { setSaving(false); }
  }
  return <Context.Provider value={{ theme, savedTheme, saving, preview: setTheme,
    cancel: () => setTheme(savedTheme), save }}>
    <div data-theme={theme} className="flex min-h-screen min-w-0 flex-1 flex-col bg-background text-text-primary">{children}</div>
  </Context.Provider>;
}
export function useTheme() {
  const context = useContext(Context);
  if (!context) throw new Error("ThemeProvider necessário");
  return context;
}
