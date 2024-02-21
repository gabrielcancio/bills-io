import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import {z} from 'zod'
export async function getUsers(app: FastifyInstance) {
  app.get('/user/:userId', async (request, reply) => {
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
    return reply.status(201).send({ user: user});
  })
}