import { loadEnv } from "./load-env";

export function getRollbarConfig() {
  // These variables are configured in `vite.config.ts`
  const {
    VITE_ROLLBAR_ACCESS_TOKEN_CLIENT: accessToken,
    VITE_GIT_VERSION: codeVersion,
  } = loadEnv();

  return accessToken?.length > 0
    ? {
        accessToken,
        environment: import.meta.env.MODE,
        captureUncaught: true,
        captureUnhandledRejections: true,

        payload: {
          client: {
            javascript: {
              source_map_enabled: false, // vite/rollup generates sourcemaps, however, they are invalid to rollbar at this moment.
              code_version: codeVersion,
            },
          },
        },
      }
    : undefined;
}
