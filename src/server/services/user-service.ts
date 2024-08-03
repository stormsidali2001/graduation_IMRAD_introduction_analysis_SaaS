import prismaClient from "@/lib/prisma-client";
import { hashPassword } from "@/lib/server-utils";
import { RegisterUserInput } from "@/schema/validation/register-user.schema";
import { UserAlreadyRegistered } from "../errors";

export const registerUser = async  ({
    email,
    password,
    name,
}:Omit<RegisterUserInput,'passwordConfirmation'> ) => {

    const hashedPassword = await hashPassword(password);
    try{

    const user = await prismaClient.user.create({
        data:{
            email,
            password:hashedPassword,
            name,
        }
    })

    return user;
    }catch(err){
        if(err.code === 'P2002'){
            throw new UserAlreadyRegistered();
        }
        throw err

    }


}
