import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaInstance } from "./prisma";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaInstance),
  providers: [
    // GitHub,
    // Google,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "someone@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string|undefined;
        const password = credentials.password as string|undefined;
        if (!email || !password) {
          throw new CredentialsSignin("Fields cant be empty");
        } 
        let user = null;
        try {
          user = await prismaInstance.user.findUnique({
            where: {
              email: email,
            },
          });
        } catch (err) {
          throw new CredentialsSignin(`cant find user : ${err}`);
        }
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        let isSame = false
        if(user && user.hashedPassword){
          isSame = await bcrypt.compare(password, user?.hashedPassword); 
        }
        if (!isSame) {
          throw new CredentialsSignin("Password didn`t matched!");
        }
        const authUser = {
          id : user.id,
          name : user.name,
          email : user.email,          
        }
        console.log("Auth User : ",authUser);
        return authUser;
      },
    }),
  ],
  pages:{
    signIn:'/login',
    signOut:'/'
  }
});
