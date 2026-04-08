import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Use WebSocket for connection pooling — keeps connections warm between requests
// and avoids Neon cold-start latency (~500ms-2s on idle scale-to-zero)
if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

// Reuse prepared statements across requests for lower query latency
neonConfig.pipelineTLS = true;
neonConfig.pipelineConnect = "password";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

// In development: reuse the client across hot-reloads to avoid connection exhaustion
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
