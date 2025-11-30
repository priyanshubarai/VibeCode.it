import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";


export default {
    providers: [
      GitHub,
      Google,
      Credentials({
      name: "Credentials",
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
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin("Fields cant be empty");
        }

        let user = null;
        try {
          // Lazy import controller to avoid importing Prisma at module load time
          const { getUserByEmail } = await import("./lib/controller");
          user = await getUserByEmail(email);
        } catch (err) {
          throw new CredentialsSignin(`cant find user : ${err}`);
        }

        if (!user) {
          throw new Error("Invalid credentials.");
        }
        
        let isSame = false;
        if (user && user.hashedPassword) {
          // Lazy import bcrypt to avoid loading native modules while Edge imports this file
          const bcrypt = (await import("bcrypt")).default;
          isSame = await bcrypt.compare(password, user?.hashedPassword);
        }
        if (!isSame) {
          throw new CredentialsSignin("Password didn`t matched!");
        }
        const authUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: "user",
        };
        console.log("Auth User : ", authUser);
        return authUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
} satisfies NextAuthConfig;
