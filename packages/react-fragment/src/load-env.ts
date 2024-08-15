import { z } from "zod";

const envSchema = z.object({
  VITE_GIT_VERSION: z.string(),
  VITE_ROLLBAR_ACCESS_TOKEN_CLIENT: z.string(),
});

export const loadEnv = () => {
  const env = envSchema.parse({
    ...import.meta.env,
  });
  return env;
};
