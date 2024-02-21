import fastify from "fastify";
import {teste} from './routes/teste'
import {createUsers} from './routes/createUsers'
import { environment } from '../env';
const app = fastify();
app.register(teste)
app.register(createUsers)

app
  .listen({
    host: environment.HOST,
    port: environment.PORT,
  })
  .then(() => {
    console.log("HTTP server running!");
  });