import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import { z } from 'zod'
export async function getUser(app: FastifyInstance) {
  app.get('/user/:userId', async (request, reply) => {
    try {
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
      if (!user) {
        return reply.status(404).send({
          "error": "Not found (404)",
          "message": "User not found",
          "details": "This user you are trying to find does not exist"

        });
      }
      return reply.status(200).send({ user: user });

    } catch (error) {
      return reply.status(500).send({
        error: true,
        message: 'Internal server error',
        detais: "Something went wrong on the server, please try again later"
      })

    }
  })
}