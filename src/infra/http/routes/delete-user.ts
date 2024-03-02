import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import { z } from 'zod'
import { NotFoundException } from "../../../errors/not-found-exception";
export async function deleteUser(app: FastifyInstance) {
  app.delete('/user/:userId', async (request, reply) => {
    const deleteUserParams = z.object({
      userId: z.string().uuid(),
    });
    const { userId } = deleteUserParams.parse(request.params);
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser) throw new NotFoundException(
      "User not found",
      "This user you are trying to delete does not exist"
    );
    
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
  })
}