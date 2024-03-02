import { FastifyInstance } from 'fastify';
import { prisma } from '../../client/prisma';
import { z } from 'zod';
import { BadRequestException } from '../../../errors/bad-request-exception';
export async function createUser(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
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

    if (existingUser)
      throw new BadRequestException(
        "User alredy exists",
        "The user you are trying to create with this CPF has already been registered previously"
      );

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        email,
      },
    });

    return reply.status(201).send({ message: 'User created!', user: user });
  });
}
