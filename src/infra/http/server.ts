import fastify from "fastify";
import {teste} from './routes/teste'
const app = fastify();
app.register(teste)
app
  .listen({
    host: '0.0.0.0',
    port: 3335,
  })
  .then(() => {
    console.log("HTTP server running!");
  });