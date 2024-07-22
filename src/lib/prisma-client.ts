import { PrismaClient } from "@prisma/client"

function getPrismaClient(){
    const prisma = new PrismaClient()
    prisma.$connect()
    return prisma
}
const prismaClient:PrismaClient = global.prismaClient ?? getPrismaClient()

global.prismaClient = prismaClient
export default prismaClient