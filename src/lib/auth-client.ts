import { createAuthClient } from "better-auth/react";

// Trim whitespace/newlines that may be injected via env var in some CI/CD environments
const baseURL = (
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
).trim();

export const authClient = createAuthClient({ baseURL });
