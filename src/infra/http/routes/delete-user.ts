import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import { z } from 'zod'
export async function deleteUser(app: FastifyInstance) {
  app.delete('/user/:userId', async (request, reply) => {
    try {
      const deleteUserParams = z.object({
        userId: z.string().uuid(),
      });
      const { userId } = deleteUserParams.parse(request.params);
      const user = await prisma.user.delete({
        where: {
          id: userId
        }
      })

      return reply.status(200).send({
        message:'User deleted!',
        deleted:{
          user:{
            id: user.id,
            name: user.name
          }
        }
      });

    } catch (error) {
      return reply.status(400).send({ message: error})
    }
  })
}