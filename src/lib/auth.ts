import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./prisma-client";
import { comparePassword } from "./server-utils";
import {
  findUserByEmail,
  findUserById,
  findUserByEmailWithCredentials,
} from "@/server/services/user-service";
import { UserDto } from "@/server/validation/UserDto";
import { authenticateWithPasswordUsecase } from "@/server/use-cases/authenticate-with-password";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (
        { email, password }: { email: string; password: string },
        request,
      ): Promise<User> => {
        return await authenticateWithPasswordUsecase(email, password);
      },
    }),
  ],
  debug: true,
  //callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, user, token }) {
      console.log("session callback here------------------");
      // user param is only available if auth strategy is database
      //@ts-ignore
      if (token.user.id) {
        //@ts-ignore
        const user = await findUserById(token.user.id);

        //@ts-ignore
        session.user = user;
      }

      console.log("session: ", session);
      console.log("token", token);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt callback here----");
      console.log("jwt", token);
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      if (user) {
        //@ts-ignore
        token.user = {
          id: user.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
