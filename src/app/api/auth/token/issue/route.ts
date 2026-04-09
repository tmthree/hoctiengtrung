/**
 * POST /api/auth/token/issue
 * Issues an initial JWT access + refresh token pair for API clients.
 * Requires a valid Better Auth session cookie — bridges session auth → JWT.
 */

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth-tokens";
import type { Role } from "@prisma/client";

const REFRESH_COOKIE = "refresh_token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(_request: NextRequest) {
  try {
    // Validate Better Auth session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Bạn cần đăng nhập để lấy token." },
        { status: 401 }
      );
    }

    const user = {
      id: session.user.id,
      email: session.user.email,
      role: ((session.user as { role?: string }).role ?? "LEARNER") as Role,
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    const response = NextResponse.json({ accessToken }, { status: 200 });

    // Set refresh token as httpOnly cookie (scoped to refresh endpoint)
    response.cookies.set(REFRESH_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/token",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi máy chủ.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
