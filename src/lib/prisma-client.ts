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
  return new PrismaClient();
}
const prismaClient: PrismaClient = global.prismaClient ?? getPrismaClient();

global.prismaClient = prismaClient;
export default prismaClient;
