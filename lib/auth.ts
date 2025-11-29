import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaInstance } from "./prisma";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";

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
        console.log("email : ",email)
        console.log("password : ",password)
        if (!email || !password) {
          throw new CredentialsSignin("Fields cant be empty");
        } 
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
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
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }
        if (password != user.hashedPassword) {
          throw new CredentialsSignin("Password didn`t matched!");
        }
        console.log("Auth User : ",user);
        return user;
      },
    }),
  ],
  pages:{
    signIn:'/login',
  }
});
