import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prismaInstance } from "./prisma"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaInstance),
  providers: [
    GitHub,
    Google,
  ],
});
