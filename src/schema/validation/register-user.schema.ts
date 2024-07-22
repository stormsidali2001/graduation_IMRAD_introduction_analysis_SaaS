import {z} from 'zod';
export const RegisterUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    name: z.string().min(3),
})

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>