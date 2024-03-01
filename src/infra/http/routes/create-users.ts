import fastify, { FastifyInstance } from 'fastify';
import { prisma } from '../../client/prisma';
import { z } from 'zod';
export async function createUser(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
    try {
      const createUserSchema = z.object({
        name: z.string(),
        cpf: z.string().min(11).max(11),
        email: z.string().email(),
      });

      const { name, cpf, email } = createUserSchema.parse(request.body);
      const existingUser = await prisma.user.findUnique({
        where: {
          cpf
        }
      });

      if (existingUser) {
        return reply.status(409).send({
          "error": "Conflict (409)",
          "message": "User alredy exists",
          "details": "The user you are trying to create with this CPF has already been registered previously"

        });
      }

      const user = await prisma.user.create({
        data: {
          name,
          cpf,
          email,
        },
      });

      return reply.status(201).send({ message: 'User created!', user: user });

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
