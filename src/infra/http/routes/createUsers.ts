import { FastifyInstance } from "fastify";
import { prisma } from '../../client/prisma'
import {z} from 'zod'
export async function createUsers(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
    const createUser = z.object({
      name: z.string(),
      cpf: z.number(),
      email: z.string(),
    });
    const { name, cpf, email } = createUser.parse(request.body);
    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        email
      }
    })

    return reply.status(201).send({ user: user });
  })
}