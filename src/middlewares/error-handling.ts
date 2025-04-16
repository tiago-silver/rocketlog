import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

function erroHandling(error:any, request: Request, response: Response, next: NextFunction){
    // Verifica se o error é do cliente ou servidor
    if(error instanceof AppError ){
        return response.status(error.statusCode).json({message: error.message})
    }
    // verifica se o erro é do zod
    if(error instanceof ZodError){
        return response.status(400).json({
            message: "Validation error",
            // retona os problemas
            issues: error.format()
        })
    }
    return response.json({message: error.message})

}

export{erroHandling}