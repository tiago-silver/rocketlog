import { Request, Response} from "express";
import { z } from "zod"
//Importação do bcrypt para criptografia de dados
import { hash } from "bcrypt";
// Importação do arquivo de banco de dados
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
    async create(request: Request, response:Response){

        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const {name, email, password} = bodySchema.parse(request.body)

        // Fazer uma verificação se o usuário já existe com mesmo email no banco de dados
        const userWithSameEmail = await prisma.user.findFirst({ where : {email}})
        // Se existir
        if(userWithSameEmail){
            throw new AppError("User with same email already exists!")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password : hashedPassword
            }

        })

        // Retirar o password do retorno 
        const {password:_, ...userWithoutPassword} = user
        
        return response.status(201).json(userWithoutPassword)
    }

}

export { UsersController}