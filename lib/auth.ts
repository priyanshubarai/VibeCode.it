import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaInstance } from "./prisma";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaInstance),
  session: { strategy: "jwt" },
  ...authConfig,
});
