import createMiddleware from "next-intl/middleware";
import { routing } from "@/config/routing";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { verifyAccessToken } from "@/lib/auth-tokens";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/dashboard", "/lessons", "/vocabulary", "/practice", "/profile"];
const adminPaths = ["/admin"];
const authPaths = ["/login", "/register", "/forgot-password"];

/**
 * Checks whether the request carries a valid JWT bearer token.
 * Returns true if the token verifies successfully; false otherwise.
 * Does NOT throw — any error means "no valid JWT auth".
 */
function hasValidBearerToken(request: NextRequest): boolean {
  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) return false;
  const token = authorization.slice(7).trim();
  if (!token) return false;
  try {
    verifyAccessToken(token);
    return true;
  } catch {
    return false;
  }
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip locale prefix to check path
  const pathnameWithoutLocale = pathname.replace(/^\/(vi|en)/, "") || "/";

  const isProtected = protectedPaths.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAdmin = adminPaths.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAuth = authPaths.some((p) => pathnameWithoutLocale.startsWith(p));

  // Auth check: JWT bearer token takes priority, then fall back to session cookie
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = hasValidBearerToken(request) || Boolean(sessionCookie);

  // Redirect unauthenticated users from protected/admin routes
  if ((isProtected || isAdmin) && !isAuthenticated) {
    const locale = pathname.match(/^\/(vi|en)/)?.[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Redirect authenticated users away from auth pages
  if (isAuth && isAuthenticated) {
    const locale = pathname.match(/^\/(vi|en)/)?.[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/"],
};
