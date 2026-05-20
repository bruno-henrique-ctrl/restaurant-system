import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const adapter = new PrismaLibSql({ url: "file:./dev.db" })

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({ adapter })

globalForPrisma.prisma = prisma