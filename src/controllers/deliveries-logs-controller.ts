import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";


class DeliveriesLogsController {
    async create(request: Request, response: Response){

    const bodySchema = z.object({
        delivery_id: z.string().uuid(),
        description: z.string()
    })

    
    const {delivery_id, description} = bodySchema.parse(request.body)

    const delivery = await prisma.delivery.findUnique({where: {id: delivery_id}})

    if(!delivery){
        throw new AppError("Delivery not found!", 404)
    }

    if (delivery.status === "Delivered"){
        throw new AppError("This order has already been delivered!")

    }

    if(delivery.status == "Processing"){
        throw new AppError("Change status to Shipped")

    }

    await prisma.deliveryLog.create({
        data: {
            deliveryId:delivery_id,
            description
        }
    })


        return response.json({message: "OK"})
    }

    async show(request:Request, response: Response){
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),

        })

        const {delivery_id} = paramsSchema.parse(request.params)

        
        const delivery = await prisma.delivery.findUnique({
            where: {id : delivery_id},
            include: {
                user: {select:  {name:true, email:true, id:true}},
                logs: {select: {description: true, deliveryId: true, updatedAt:true}}
            }
        })
         if(!delivery){
            return response.json({message: "delivery not found!"})
         }
        //Verifica se o usuário logado está buscando logs de um pedido dele mesmo
        if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("The user can only view their deliveries", 401)
        }
        return response.json(delivery)
    }
}

export { DeliveriesLogsController}