import NextAuth, { User, CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { comparePassword } from "./server-utils";
import {
  findUserByEmail,
  findUserById,
  findUserByEmailWithCredentials,
} from "@/server/services/user-service";
import { UserDto } from "@/server/validation/UserDto";
import { authenticateWithPasswordUsecase } from "@/server/use-cases/authenticate-with-password";
import prismaClient from "./prisma-client";
import { ActionError } from "./safe-action";
import EmailProvider from "next-auth/providers/email";
import {
  sendResetEmail,
  sendVerificationLink,
} from "@/server/services/email-service";
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
      ) => {
        try {
          const user = await authenticateWithPasswordUsecase(email, password);
          return user;
        } catch (err) {
          throw new CredentialsSignin(err);
        }
      },
    }),

    // TODO: refactor this if you want to move to prod
    EmailProvider({
      name: "email",
      server: "https://resend.com",
      from: "YOUR EMAIL FROM (eg: team@resend.com)",

      sendVerificationRequest: async (params) => {
        sendVerificationLink({
          email: params.identifier,
          url: params.url,
        });
      },
    }),
  ],
  debug: true,
  //callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return user.role === "Admin" || !user.isBanned;
    },
    async redirect({ url, baseUrl }) {
      return url ?? baseUrl;
    },

    async session({ session, token }) {
      if (token.user?.id) {
        const user = await findUserById(token.user.id);
        if (user) {
          // @ts-ignore — PrismaAdapter version conflict (@auth/core@0.34.1 vs 0.28.1)
          session.user = user;
        }
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
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
