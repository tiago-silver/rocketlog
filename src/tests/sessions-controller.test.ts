import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"
import { string } from "zod"

describe("SessionsController", () => {
    let user_id : string

    afterAll( async() => {
        await prisma.user.delete({where: {id: user_id}})
    })
    // Teste deverá criar um usuário, autenticar e retornar um token
    it("should authenticate and get access token ",async () => {
        const userResponse = await request(app).post("/users").send({
            name: "User Test",
            email: "test@gmail.com",
            password: "password123"
        })
        user_id = userResponse.body.id

        const sessionsResponse = await request(app).post("/sessions").send({
            email: "test@gmail.com",
            password: "password123"  
        })
        
        //Espera um status de criado 
        expect(sessionsResponse.status).toBe(200)
        //espera um token seja uma string
        expect(sessionsResponse.body.token).toEqual(expect.any(String ))

    })

    

})