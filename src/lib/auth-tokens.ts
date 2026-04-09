/**
 * JWT access/refresh token utilities with refresh token rotation and breach detection.
 * Uses BETTER_AUTH_SECRET as the signing key (already present in env).
 */

import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import type { Role } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccessTokenPayload {
  sub: string;   // userId
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const JWT_SECRET = process.env.BETTER_AUTH_SECRET!;
const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_DAYS = 7;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSecret(): string {
  if (!JWT_SECRET) throw new Error("BETTER_AUTH_SECRET is not set");
  return JWT_SECRET;
}

function refreshExpiresAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + REFRESH_TOKEN_TTL_DAYS);
  return d;
}

// ─── Access Token ─────────────────────────────────────────────────────────────

export function generateAccessToken(user: {
  id: string;
  email: string;
  role: Role;
}): string {
  const payload: Omit<AccessTokenPayload, "iat" | "exp"> = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, getSecret(), { expiresIn: ACCESS_TOKEN_TTL });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    return jwt.verify(token, getSecret()) as AccessTokenPayload;
  } catch {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }
}

// ─── Refresh Token ────────────────────────────────────────────────────────────

/**
 * Creates a new refresh token record in the DB and returns the opaque token string.
 * Optionally pass a `family` string to group tokens for rotation tracking.
 */
export async function generateRefreshToken(
  user: { id: string },
  family?: string
): Promise<string> {
  const token = randomUUID();
  const tokenFamily = family ?? randomUUID();

  await db.refreshToken.create({
    data: {
      userId: user.id,
      token,
      family: tokenFamily,
      expiresAt: refreshExpiresAt(),
    },
  });

  return token;
}

// ─── Token Rotation ───────────────────────────────────────────────────────────

/**
 * Rotates a refresh token:
 * - If already revoked → breach detected, revoke entire family, throw 401.
 * - If valid → revoke old token, issue new token pair in same family.
 */
export async function rotateRefreshToken(oldToken: string): Promise<TokenPair & { userId: string }> {
  const record = await db.refreshToken.findUnique({
    where: { token: oldToken },
    include: { user: { select: { id: true, email: true, role: true } } },
  });

  if (!record) {
    throw new Error("Refresh token không tồn tại");
  }

  // Breach detection: token already used/revoked
  if (record.revokedAt !== null) {
    await revokeTokenFamily(record.family);
    throw new Error("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
  }

  // Token expired
  if (record.expiresAt < new Date()) {
    await db.refreshToken.update({
      where: { id: record.id },
      data: { revokedAt: new Date() },
    });
    throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  }

  const { user } = record;

  // Revoke old token
  const newTokenValue = randomUUID();
  await db.refreshToken.update({
    where: { id: record.id },
    data: { revokedAt: new Date(), replacedBy: newTokenValue },
  });

  // Issue new refresh token in same family
  await db.refreshToken.create({
    data: {
      userId: user.id,
      token: newTokenValue,
      family: record.family,
      expiresAt: refreshExpiresAt(),
    },
  });

  const accessToken = generateAccessToken(user);

  return { accessToken, refreshToken: newTokenValue, userId: user.id };
}

// ─── Revocation ───────────────────────────────────────────────────────────────

/** Revoke all tokens in a family (used on logout or breach detection). */
export async function revokeTokenFamily(family: string): Promise<void> {
  await db.refreshToken.updateMany({
    where: { family, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

/** Revoke all refresh tokens for a user (e.g., password change). */
export async function revokeAllUserTokens(userId: string): Promise<void> {
  await db.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
