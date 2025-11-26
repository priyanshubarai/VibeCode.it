import NextAuth from "next-auth"
// import {PrismaAdapter} from "@auth/prisma-adapter"
// import { prisma } from "./db"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [GitHub],
})