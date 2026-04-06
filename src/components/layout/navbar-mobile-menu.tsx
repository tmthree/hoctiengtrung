"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/logo";

interface NavLink {
  labelKey: string;
  href: string;
}

interface NavbarMobileMenuProps {
  links: NavLink[];
}

export function NavbarMobileMenu({ links }: NavbarMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Mở menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="flex flex-col gap-6 pt-4">
          <Logo />
          <Separator />
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <Separator />
          <div className="flex flex-col gap-2">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">
                {t("login")}
              </Button>
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white">
                {t("getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
