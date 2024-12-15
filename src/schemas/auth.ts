import { z } from 'zod'

export const userRegisterSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    occupation: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    role: z.enum(["MEMBER", "ADMIN"]),
    interests: z.array(z.number().int()),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})