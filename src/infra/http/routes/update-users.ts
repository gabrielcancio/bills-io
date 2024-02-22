import { FastifyInstance } from 'fastify';
import { prisma } from '../../client/prisma';
import { z } from 'zod';

export async function updateUsers(app: FastifyInstance) {
  app.put('/user/:userId', async (request, reply) => {
    try {
      const updateUserSchema = z.object({
        userId: z.string().uuid(),
      });
      const updateDataUserSchema = z.object({
        email: z.string().email(),
      })
      const { userId } = updateUserSchema.parse(request.params);
      const { email } = updateDataUserSchema.parse(request.body);

      const existingUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      if (!existingUser) {
        return reply.status(400).send({
          message: 'User not found',
        });
      }

      const user = await prisma.user.update({
        select: {
          id: true
        },
        where: {
          id: userId
        },
        data: {
          email
        },
      });
      return reply.status(201).send({
         message: 'User updated!', 
         user:  {
           id: user.id,
           email
         }
        });

    } catch (error) {
      return reply.status(400).send({
        error: error
      })
    }

  });
}