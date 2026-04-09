/**
 * Role-Based Access Control (RBAC) utilities.
 * Defines permissions per role and provides helper functions for authorization checks.
 */

import type { Role } from "@prisma/client";

// ─── Permissions ──────────────────────────────────────────────────────────────

export type Permission =
  | "course:create"
  | "course:edit"
  | "course:delete"
  | "lesson:create"
  | "lesson:edit"
  | "user:manage"
  | "enrollment:view-all"
  | "content:manage";

const ALL_PERMISSIONS: Permission[] = [
  "course:create",
  "course:edit",
  "course:delete",
  "lesson:create",
  "lesson:edit",
  "user:manage",
  "enrollment:view-all",
  "content:manage",
];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  LEARNER: [],
  INSTRUCTOR: [
    "course:create",
    "course:edit",
    "lesson:create",
    "lesson:edit",
  ],
  ADMIN: ALL_PERMISSIONS,
};

// ─── Session shape accepted by helpers ───────────────────────────────────────

export interface SessionLike {
  user: {
    id: string;
    role: Role;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns true if the given role has the specified permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Asserts that the session user has at least one of the given roles.
 * Throws a descriptive error if not.
 */
export function requireRole(session: SessionLike | null, ...roles: Role[]): void {
  if (!session) {
    throw new Error("Bạn cần đăng nhập để thực hiện hành động này.");
  }
  if (!roles.includes(session.user.role)) {
    throw new Error("Bạn không có quyền thực hiện hành động này.");
  }
}

/**
 * Asserts that the session user has the specified permission.
 * Throws a descriptive error if not.
 */
export function requirePermission(
  session: SessionLike | null,
  permission: Permission
): void {
  if (!session) {
    throw new Error("Bạn cần đăng nhập để thực hiện hành động này.");
  }
  if (!hasPermission(session.user.role, permission)) {
    throw new Error(
      `Bạn không có quyền thực hiện hành động "${permission}".`
    );
  }
}

/**
 * Returns all permissions for a given role.
 */
export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role];
}
