import fastify, { FastifyError } from "fastify";
import { createUser } from './routes/create-user'
import { environment } from '../env';
import { getUser } from "./routes/get-user";
import { updateUser } from "./routes/update-user";
import { deleteUser } from "./routes/delete-user";
import { CustomErrorHandler } from "./custom-error-handler";
const app = fastify();
const errorHandler = new CustomErrorHandler();

app.setErrorHandler(errorHandler.getBindedHandle())

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