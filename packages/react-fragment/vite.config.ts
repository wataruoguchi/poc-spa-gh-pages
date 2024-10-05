import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const gitVersion = execSync("git rev-parse --short HEAD").toString().trim();

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const defaultConfig = {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_GIT_VERSION": `"${gitVersion}"`,
      "import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN_CLIENT": `""`,
    },
  };
  if (command === "build") {
    // use `index.tsx`
    return {
      ...defaultConfig,
      plugins: [
        ...defaultConfig.plugins,
        cssInjectedByJsPlugin({
          injectCode: (cssCode: string) => {
            return `window.__styles["react-fragment"] = ${cssCode}`;
          },
          topExecutionPriority: false, // Otherwise, the plugin messes up the sourcemaps.
        }),
      ],
      define: {
        ...defaultConfig.define,
        "process.env.NODE_ENV": '"production"',
        // The CI/CD pipeline sets the ROLLBAR_ACCESS_TOKEN_CLIENT environment variable to the Rollbar access token for the production environment.
        "import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN_CLIENT": `"${process.env.ROLLBAR_ACCESS_TOKEN_CLIENT ?? ""}"`,
      },
      base: "./", // Relative path to the root of the repository
      build: {
        manifest: "manifest.json",
        sourcemap: false,
        rollupOptions: {
          input: "src/index.tsx",
          preserveEntrySignatures: "strict",
          output: {
            manualChunks: (id) => {
              if (id.includes("node_modules")) {
                return "vendor";
              }
            },
          },
        },
      },
    };
  } else {
    // use `main.tsx` and `index.html`
    return {
      ...defaultConfig,
      define: {
        ...defaultConfig.define,
        "process.env.NODE_ENV": '"development"',
        "import.meta.env.VITE_CDN_HOST": `"http://example.com"`,
      },
      test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: ["./vitest-setup.js", "src/test-utils/setup-mock.ts"],
        coverage: {
          include: ["src/**/*.ts", "src/**/*.tsx"],
          exclude: ["src/**/*.d.ts", "src/main.tsx", "src/index.tsx"],
          thresholds: {
            statements: 80,
            branches: 80,
            lines: 80,
            functions: 80,
          },
          reporter: ["cobertura", "html", "text"],
        },
      },
    };
  }
});
