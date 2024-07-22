import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
 import { PrismaAdapter } from "@auth/prisma-adapter"
import prismaClient from "./prisma-client";
import { findUserByEmail } from "@/server/dao/user";
import { comparePassword } from "./utils";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter:PrismaAdapter(prismaClient),
  providers: [
    Google,
    Credentials({

      credentials: {
        email:{
            label:"Email",
            type:"email"
        },
        password: {  label: "Password", type: "password" }
      },

      authorize: async ({email,password }:{email:string,password:string},request): Promise<User> => {
        const user = await findUserByEmail(email);
        if(!user) return null;
        if(!comparePassword(user.password,password)) return null;
        return user;
      },

  })],
  callbacks:{



  },
  
});