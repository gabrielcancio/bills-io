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
      const existingUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      if (!existingUser) {
        return reply.status(404).send({
          "error": "Not found (404)",
          "message": "User not found",
          "details": "This user you are trying to delete does not exist"
        });
      }
      const user = await prisma.user.delete({
        where: {
          id: userId
        }
      })
      return reply.status(200).send({
        message: 'User deleted!',
        deleted: {
          user: {
            id: user.id,
            name: user.name
          }
        }
      });
    } catch (error) {
      return reply.status(500).send({
        error: true,
        message: 'Internal server error',
        detais: "Something went wrong on the server, please try again later"
      });

    }


  })
}