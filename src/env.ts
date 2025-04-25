import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    //Caso retorne uma string, converta para número
    PORT : z.coerce.number().default(3000)
})

export const env = envSchema.parse(process.env)