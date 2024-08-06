import NextAuth, { DefaultSession } from "next-auth";
import { type $Enums } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      customerId?: string;
      plan: $Enum.Plan;
      role: $Enum.Role;
    } & DefaultSession["user"];
  }
}
