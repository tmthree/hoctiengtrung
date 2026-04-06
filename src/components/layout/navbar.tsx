import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { NavbarMobileMenu } from "@/components/layout/navbar-mobile-menu";

const marketingLinks = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "pricing", href: "/pricing" },
];

export async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        {/* Logo */}
        <Logo className="shrink-0" />

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {marketingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm">
              {t("login")}
            </Button>
          </Link>
          <Link href="/register" className="hidden md:inline-flex">
            <Button
              size="sm"
              className="rounded-full bg-primary hover:bg-primary/90 text-white"
            >
              {t("getStarted")}
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <NavbarMobileMenu links={marketingLinks} />
        </div>
      </div>
    </header>
  );
}
