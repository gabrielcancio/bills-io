import fastify from "fastify";
import {teste} from './routes/teste'
import {createUsers} from './routes/create-users'
import { environment } from '../env';
import { getUsers } from "./routes/get-users";
import { deleteUsers } from "./routes/delete-user";
const app = fastify();
app.register(teste)
app.register(createUsers)
app.register(getUsers)
app.register(deleteUsers)

app
  .listen({
    host: environment.HOST,
    port: environment.PORT,
  })
  .then(() => {
    console.log("HTTP server running!");
  });