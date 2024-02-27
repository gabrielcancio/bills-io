import { FastifyInstance } from 'fastify';
import { prisma } from '../../client/prisma';
import { z } from 'zod';

export async function updateUser(app: FastifyInstance) {
  app.put('/user/:userId', async (request, reply) => {
    try {
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

      if (!existingUser) {
        return reply.status(400).send({
          message: 'User not found',
        });
      }
      const user= await prisma.user.update({
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

    } catch (error) {
      return reply.status(400).send({
        error: error
      })
    }

  });
}