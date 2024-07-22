import prismaClient from "@/lib/prisma-client"

export const findUserByEmail = async (email:string)=>{
    return prismaClient.user.findUnique({where:{email}})
}