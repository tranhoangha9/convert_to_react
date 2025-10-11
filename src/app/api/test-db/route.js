import { prisma } from '../../../lib/prisma'

export async function GET(){
    try{
        await prisma.$connect()
        const result = await prisma.$queryRaw`Select 1 as test`

        return Response.json({
            success: true,
            message: 'Database connected successfully',
            result
        })
    } catch (error){
        console.error('Database no connection',error)
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 })
}
}