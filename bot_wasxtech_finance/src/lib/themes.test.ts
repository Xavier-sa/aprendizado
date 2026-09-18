import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { THEME_IDS } from "./themes";

const css = readFileSync("src/app/globals.css", "utf8");
function colors(theme: string) {
  const block = css.match(new RegExp(`\\[data-theme="${theme}"\\]\\s*\\{([^}]+)\\}`))![1];
  return Object.fromEntries([...block.matchAll(/--color-([\w-]+):\s*(#[\da-f]+);/gi)].map((match) => [match[1], match[2]]));
}
function luminance(hex: string) {
  const values = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
export function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe("palette accessibility: WCAG contrast from the actual CSS tokens", () => {
  it.each(THEME_IDS)("%s: normal text, actions, hover, semantic and disabled text >=4.5:1", (theme) => {
    const c = colors(theme);
    const pairs = [
      ...["background", "surface", "surface-secondary"].flatMap((bg) =>
        ["text-primary", "text-muted", "accent", "income", "expense"].map((fg) => [fg, bg])),
      ["accent-foreground", "accent"], ["accent-foreground", "accent-strong"],
      ["expense-foreground", "expense"], ["expense-foreground", "expense-strong"],
      ["income", "income-soft"], ["expense", "expense-soft"],
    ];
    for (const [fg, bg] of pairs) expect(contrast(c[fg], c[bg]), `${theme}: ${fg}/${bg}`).toBeGreaterThanOrEqual(4.5);
  });
  it.each(THEME_IDS)("%s: control boundaries, focus and chart marks >=3:1", (theme) => {
    const c = colors(theme);
    for (const bg of ["background", "surface", "surface-secondary"]) {
      for (const fg of ["control-border", "accent"]) expect(contrast(c[fg], c[bg]), `${theme}: ${fg}/${bg}`).toBeGreaterThanOrEqual(3);
    }
    for (let i = 1; i <= 8; i++) expect(contrast(c[`chart-${i}`], c.surface), `${theme}: chart-${i}`).toBeGreaterThanOrEqual(3);
  });
  it("corrects the diagnosed original button combination", () => {
    expect(contrast("#a9782e", "#fbf6ec")).toBeCloseTo(3.60, 2);
    const c = colors("PAPIRO");
    expect(contrast(c.accent, c["accent-foreground"])).toBeGreaterThanOrEqual(4.5);
  });
});
