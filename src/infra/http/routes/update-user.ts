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
        return reply.status(404).send({
          "error": "Not found (404)",
          "message": "User not found",
          "details": "This user you are trying to update does not exist"

        });
      }
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

    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Bad Request (400)',
          message: 'Validation failed',
          details: error.issues.map((issue) => {
            return {
              path: issue.path,
              message: issue.message,
            };
          })

        });
      } else {
        return reply.status(500).send({
          error: true,
          message: 'Internal server error',
          detais: "Something went wrong on the server, please try again later"
        });
      }
    }

  });
}