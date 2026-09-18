"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItems } from "./Sidebar";
import { LogoutButton } from "./LogoutButton";

export function MobileNav({ admin = false, canAccessAdmin = false }: { admin?: boolean; canAccessAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-border bg-surface md:hidden">
      {getNavItems(admin, canAccessAdmin).map((item) => {
        const active = item.href === "/admin" ? pathname === item.href : pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-3 text-center text-xs font-medium ${
              active ? "text-accent" : "text-text-muted"
            }`}
          >
            <Icon />
            <span className="max-w-full break-words">{"mobileLabel" in item ? item.mobileLabel : item.label}</span>
          </Link>
        );
      })}
      <LogoutButton className="flex flex-1 flex-col items-center gap-0.5 py-3 text-center text-xs font-medium text-text-muted" />
    </nav>
  );
}
