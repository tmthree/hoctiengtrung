import createMiddleware from "next-intl/middleware";
import { routing } from "@/config/routing";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/dashboard", "/lessons", "/vocabulary", "/practice", "/profile"];
const adminPaths = ["/admin"];
const authPaths = ["/login", "/register", "/forgot-password"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip locale prefix to check path
  const pathnameWithoutLocale = pathname.replace(/^\/(vi|en)/, "") || "/";

  const isProtected = protectedPaths.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAdmin = adminPaths.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAuth = authPaths.some((p) => pathnameWithoutLocale.startsWith(p));

  const sessionCookie = getSessionCookie(request);

  // Redirect unauthenticated users from protected/admin routes
  if ((isProtected || isAdmin) && !sessionCookie) {
    const locale = pathname.match(/^\/(vi|en)/)?.[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Redirect authenticated users away from auth pages
  if (isAuth && sessionCookie) {
    const locale = pathname.match(/^\/(vi|en)/)?.[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/"],
};
