import { Request, Response, NextFunction } from "express";

class UsersController {
    async create(request: Request, response:Response){
        
        return response.json({ message: "Ok"})
    }

}

export { UsersController}