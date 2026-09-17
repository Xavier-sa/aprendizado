import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <main className="flex-1 px-4 pb-20 pt-6 sm:px-6 md:pb-6 lg:px-8">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
