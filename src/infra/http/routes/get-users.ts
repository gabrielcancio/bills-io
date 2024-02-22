import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import {z} from 'zod'
export async function getUsers(app: FastifyInstance) {
  app.get('/user/:userId', async (request, reply) => {
   try {
    const getUserParams = z.object({
      userId: z.string().uuid(),
    });
    const { userId } = getUserParams.parse(request.params) ;
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        name: true,
        cpf: true
      }

    })
    if(user){
      return reply.status(200).send({ user: user});
    }else{
      return reply.status(404).send({ message: 'User not found!'});
    }
   } catch (error) {
    return reply.status(500).send({ message: error})
   }
  })
}