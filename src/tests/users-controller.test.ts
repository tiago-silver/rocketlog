import { app } from "@/app"
import { prisma } from "@/database/prisma"

import request from "supertest"
describe("UsersController",() => {

    let user_id: string

    afterAll( async()=> {
        await prisma.user.delete({where: {id:user_id}})
    })
    
    it("should create a new user successfully", async()=> {
        const response = await request(app).post("/users").send({
            name: "User Test",
            email: "test@gmail.com",
            password: "password123"
        })

        expect(response.status).toBe(201)
        //Testa se há a propriedade id no corpo da requisição
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("User Test")
        
        user_id = response.body.id
    })
})