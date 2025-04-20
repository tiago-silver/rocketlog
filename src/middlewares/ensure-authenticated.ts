import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
    role: string
    sub: string
}

function ensureAuthenticated(request:Request, response:Response, next:NextFunction){
    try {
        // Recupera o token do cabeçaho da requisiçao
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new AppError("JWT Token not found!", 401)
        }
        // Extrai somente o token
        const [, token] = authHeader.split(" ")

        // Verifica o token  e  extrai o papel do usuário para inserir na requisição o usuário autorizado
        const { role, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPayload

        // Inserção na requisição (criar a tipagem)
        request.user = {
            id: user_id,
            role,
        }

        return next()
        
    } catch (error) {
        throw new AppError(" invalid JWT Token !", 401)
        
    }

}

export { ensureAuthenticated}