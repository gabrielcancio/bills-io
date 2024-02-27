import fastify from "fastify";
import {createUser } from './routes/create-users'
import { environment } from '../env';
import { getUser } from "./routes/get-user";
import { updateUser } from "./routes/update-user";
import { deleteUser } from "./routes/delete-user";
const app = fastify();
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