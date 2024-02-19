import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  HOST: z.string()
});

const environment = envSchema.parse(process.env);

export { environment };