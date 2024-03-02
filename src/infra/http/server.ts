import fastify, { FastifyError } from "fastify";
import {createUser } from './routes/create-users'
import { environment } from '../env';
import { getUser } from "./routes/get-user";
import { updateUser } from "./routes/update-user";
import { deleteUser } from "./routes/delete-user";
import { ZodError } from "zod";
import { HttpException } from "../../errors/http-exception";
const app = fastify();

app.setErrorHandler((error: any, request, reply) => {
  if(error instanceof HttpException) return reply.status(error.getStatus()).send(error.getHttpResponse());
  if(error instanceof ZodError) return reply.status(400).send({
    error: true,
    message: 'Validation Error',
    details: error.issues.map((issue) => {
      return {
        path: issue.path,
        message: issue.message,
      };
    })
  });
  reply.status(500).send({ ok: false, message: error.message })
})

app.register(createUser)
app.register(getUser)
app.register(updateUser)
app.register(deleteUser)

app
  .listen({
    host: environment.HOST,
    port: environment.PORT,
  })
  .then(() => {
    console.log("HTTP server running!");
  });