import { FastifyInstance } from 'fastify';
import { prisma } from '../../client/prisma';
import { z } from 'zod';

export async function createUser(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
    try {
      const createUserSchema = z.object({
        name: z.string(),
        cpf: z.string(),
        email: z.string().email(),
      });

      const { name, cpf, email } = createUserSchema.parse(request.body);
      const existingUser = await prisma.user.findUnique({
        where: {
          cpf
        }
      });

      if (existingUser) {
        return reply.status(400).send({
          message: 'User already exists',
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
      return reply.status(400).send({
        error: error
      })
    }

  });
}
