import fastify from "fastify";
import {teste} from './routes/teste'
import { environment } from '../env';
const app = fastify();
app.register(teste)
app
  .listen({
    host: environment.HOST,
    port: environment.PORT,
  })
  .then(() => {
    console.log("HTTP server running!");
  });