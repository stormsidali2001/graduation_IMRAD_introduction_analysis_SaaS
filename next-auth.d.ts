import NextAuth, { DefaultSession } from "next-auth";
import { type $Enums } from "@prisma/client";
import { type UserDtoType } from "@/server/validation/UserDto";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends UserDtoType {}

  interface Session {
    user: UserDtoType;
  }
}
