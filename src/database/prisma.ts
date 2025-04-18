import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // Verifica o ambiente se é de desenvolvimento ou de produção
    log: process.env.NODE_ENV === "production" ? [] : ["query"]
})