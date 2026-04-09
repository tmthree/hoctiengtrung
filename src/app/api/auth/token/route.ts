/**
 * POST /api/auth/token
 * Refresh access token using a refresh token (from body or httpOnly cookie).
 * Implements token rotation with breach detection.
 */

import { NextRequest, NextResponse } from "next/server";
import { rotateRefreshToken } from "@/lib/auth-tokens";

const REFRESH_COOKIE = "refresh_token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(request: NextRequest) {
  try {
    // Prefer body token, fall back to httpOnly cookie
    let refreshToken: string | undefined;

    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}));
      refreshToken = body?.refreshToken as string | undefined;
    }

    if (!refreshToken) {
      refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
    }

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token không được cung cấp." },
        { status: 400 }
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await rotateRefreshToken(refreshToken);

    const response = NextResponse.json({ accessToken }, { status: 200 });

    // Rotate httpOnly cookie
    response.cookies.set(REFRESH_COOKIE, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/token",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi xác thực.";
    // Revocation errors (breach) must return 401
    const isAuthError =
      message.includes("không hợp lệ") || message.includes("hết hạn");
    const status = isAuthError ? 401 : 400;

    const response = NextResponse.json({ error: message }, { status });

    // Clear compromised cookie
    response.cookies.delete(REFRESH_COOKIE);

    return response;
  }
}
