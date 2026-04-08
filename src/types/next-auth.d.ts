import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "Admin" | "User";
      plan: "free" | "premium";
      isBanned: boolean;
      customerId: string;
    };
  }
  interface User extends DefaultUser {
    role: "Admin" | "User";
    plan: "free" | "premium";
    isBanned: boolean;
    customerId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: { id: string };
  }
}
