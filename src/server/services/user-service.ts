import prismaClient from "@/lib/prisma-client";
import { hashPassword } from "@/lib/utils";
import { RegisterUserInput } from "@/schema/validation/register-user.schema";

export const registerUser = async  ({
    email,
    password,
    name,
}:Omit<RegisterUserInput,'passwordConfirmation'> ) => {

    const hashedPassword = await hashPassword(password);
    const user = await prismaClient.user.create({
        data:{
            email,
            password:hashedPassword,
            name,
        }
    })

    return user;

}