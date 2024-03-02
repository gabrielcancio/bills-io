import { FastifyInstance } from 'fastify';
import { prisma } from '../../client/prisma';
import { z } from 'zod';
import { NotFoundException } from '../../../errors/not-found-exception';

export async function updateUser(app: FastifyInstance) {
  app.put('/user/:userId', async (request, reply) => {
    const updateUserSchema = z.object({
      userId: z.string().uuid(),
    });
    const updateUserDataSchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional()

    })
    const { userId } = updateUserSchema.parse(request.params);
    const { name, email } = updateUserDataSchema.parse(request.body);
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser) throw new NotFoundException(
      "User not found",
      "This user you are trying to update does not exist"
    );
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email
      },
    });


    return reply.status(200).send({
      message: 'User  updated!',
      user: {
        id: user.id,
      }
    });
  });
}