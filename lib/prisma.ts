import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prismaInstance = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if(process.env.NODE_ENV!=='production') globalForPrisma.prisma = prismaInstance;
