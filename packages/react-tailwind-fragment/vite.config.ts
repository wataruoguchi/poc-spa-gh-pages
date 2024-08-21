import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const defaultConfig = {
    plugins: [react()],
  };
  if (command === "build") {
    // use `index.tsx`
    return {
      ...defaultConfig,
      plugins: [
        ...defaultConfig.plugins,
        cssInjectedByJsPlugin({
          injectCode: (cssCode: string) => {
            return `window.__styles = ${cssCode}`;
          },
        }),
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
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
        "process.env.NODE_ENV": '"development"',
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
