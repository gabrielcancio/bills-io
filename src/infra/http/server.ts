import fastify from "fastify";
import {createUsers} from './routes/create-users'
import { environment } from '../env';
import { getUsers } from "./routes/get-users";
import { updateUsers } from "./routes/update-users";
import { deleteUsers } from "./routes/delete-user";
const app = fastify();
app.register(createUsers)
app.register(getUsers)
app.register(updateUsers)
app.register(deleteUsers)

app
  .listen({
    host: environment.HOST,
    port: environment.PORT,
  })
  .then(() => {
    console.log("HTTP server running!");
  });