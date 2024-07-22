import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
 import { PrismaAdapter } from "@auth/prisma-adapter"
import prismaClient from "./prisma-client";
import { findUserByEmail } from "@/server/dao/user";
import { comparePassword } from "./server-utils";

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
        console.log("authorization running")
        const user = await findUserByEmail(email);
        if(!user) return null;
        const match =await comparePassword(user.password,password) 
        if(!match) return null;
        console.log("user loged in",user)
        return user;
      },

  })],
  debug:true,
  //callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn", { user, account, profile, email, credentials })
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },

    async session({ session, user, token }) {
      console.log("session",{session,user,token  })
        //@ts-ignore
        token.user && (session.user = token.user)
        return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log({
        token,
        user,
        account,
        profile,
        isNewUser
      })
      return token
    },
  },
  session:{
    strategy:"jwt",
  }
  
  
});