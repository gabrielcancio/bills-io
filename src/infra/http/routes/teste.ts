import { FastifyInstance } from "fastify";
import { prisma } from '../../../infra/client/prisma'
export async function teste(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const data = await prisma.tabelaTeste.create({
      data: {
        nome: 'teste'
      }
    })
    return reply.send(data)
  })
}