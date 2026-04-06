import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";

export async function Footer() {
  const t = await getTranslations("nav");

  return (
    <footer className="bg-muted border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Nền tảng học tiếng Trung toàn diện — từ phát âm, từ vựng đến ngữ
              pháp — giúp bạn tự tin giao tiếp.
            </p>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Khám phá</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/lessons"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("lessons")}
                </Link>
              </li>
              <li>
                <Link
                  href="/vocabulary"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("vocabulary")}
                </Link>
              </li>
              <li>
                <Link
                  href="/practice"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("practice")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Thông tin</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Học Tiếng Trung. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
