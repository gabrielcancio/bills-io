import { FastifyInstance } from "fastify";
export async function teste(app:FastifyInstance){
  app.get('/', async(request,reply)=>{
    return {message:"Funcionando"}
  })
}