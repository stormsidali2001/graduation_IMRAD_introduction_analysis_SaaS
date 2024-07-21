import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google, Credentials({

      credentials: {
        email:{
            label:"Email",
            type:"email"
        },
        password: {  label: "Password", type: "password" }
      },
      authorize: async ({email,password },request): Promise<User> => {
        if(email === "sidali" && password === "sidali") {

        }

        return null;

      },
  })],
  callbacks:{



  },
  
});