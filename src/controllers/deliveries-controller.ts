import { Request, Response } from "express";
import { z } from "zod"
import { prisma } from "@/database/prisma";

class DeliveriesController {
    async create(request:Request, response: Response){
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string()
        })

        const {user_id, description} = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })

        return response.status(201).json()
    }
}

export {DeliveriesController}