import { z } from "zod";

const envSchema = z.object({
  VITE_CDN_HOST: z.string(),
});

export const loadEnv = () => {
  const env = envSchema.parse({
    ...import.meta.env,
  });
  return env;
};
