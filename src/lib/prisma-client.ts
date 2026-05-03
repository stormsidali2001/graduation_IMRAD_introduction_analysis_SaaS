import { PrismaClient } from "@prisma/client";
import { isPreviewMode } from "./preview-mode";

function getPrismaClient(): PrismaClient {
  if (isPreviewMode()) {
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        throw new Error(`[Preview Mode] Prisma.${String(prop)} called — no database in preview mode`);
      },
    });
  }
  const prisma = new PrismaClient();
  prisma.$connect();
  return prisma;
}
const prismaClient: PrismaClient = global.prismaClient ?? getPrismaClient();

global.prismaClient = prismaClient;
console.log("seeed.....................................");
export default prismaClient;
