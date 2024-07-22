"use server"

import prismaClient from "@/lib/prisma-client"
import { actionClient } from "@/lib/safe-action"
import { RegisterUserSchema } from "@/schema/validation/register-user.schema"
import { registerUser } from "../services/user-service"
import { UserAlreadyRegistered } from "../errors"
import { signIn } from "@/lib/auth"

export const registerUserAction = actionClient
.schema(RegisterUserSchema)
.metadata({actionName:"registerUser"})
.action(async ({parsedInput:{
    name,
    email,
    password
}
})=>{

    await registerUser({name,email,password})
    await signIn("credentials",{email,password})

})