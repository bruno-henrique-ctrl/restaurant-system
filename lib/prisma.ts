import { PrismaClient } from "../prisma/generated/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL!, authToken: process.env.AUTH_TOKEN! })

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

export const prisma =
    globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}