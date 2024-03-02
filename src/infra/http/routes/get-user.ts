import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import { z } from 'zod'
import { NotFoundException } from "../../../errors/not-found-exception";
export async function getUser(app: FastifyInstance) {
  app.get('/user/:userId', async (request, reply) => {
    const getUserParams = z.object({
      userId: z.string().uuid(),
    });
    const { userId } = getUserParams.parse(request.params);
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        name: true,
        cpf: true
      }

    })
    if (!user) throw new NotFoundException(
      "User not found",
      "This user you are trying to find does not exist"
    );
    
    return reply.status(200).send({ user: user });
  })
}