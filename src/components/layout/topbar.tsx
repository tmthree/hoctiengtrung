"use client";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Topbar() {
  return (
    <header className="flex h-16 items-center border-b bg-card px-4 gap-3">
      {/* Mobile nav trigger */}
      <MobileNav />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side controls */}
      <LocaleSwitcher />
    </header>
  );
}
