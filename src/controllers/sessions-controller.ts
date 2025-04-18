import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { z } from "zod"
import { authConfig } from "@/config/auth";
import { sign } from "jsonwebtoken";
class SessionsController {
    async create(request: Request, response: Response){

        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password} = bodySchema.parse(request.body)

        // Busca o usuário com email
        const user = await prisma.user.findFirst({where: {email}})

        if(!user){
            throw new AppError("Email ou senha incorretos!", 401)
        }
        // Faz a comparação das senhas
        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Email ou senha incorretos!", 401)
        }

        // Depois de tudo verificado criat o token de autenticação de usuário

        const { secret, expiresIn} = authConfig.jwt

        const token = sign({role: user.role ?? "Customer"},secret, {
            subject: user.id,
            expiresIn
        })

        return response.json({token})
    }

}

export { SessionsController}