import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-strong",
  secondary: "bg-surface-secondary text-text-primary hover:bg-border",
  ghost: "bg-transparent text-text-primary hover:bg-surface-secondary",
  danger: "bg-expense text-expense-foreground hover:bg-expense-strong",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground disabled:hover:bg-disabled ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
