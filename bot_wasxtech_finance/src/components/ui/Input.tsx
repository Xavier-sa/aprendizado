import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`min-w-0 w-full rounded-md border border-control-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-focus disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled-border ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`min-w-0 w-full rounded-md border border-control-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-focus disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled-border ${className}`}
      {...props}
    />
  );
}
