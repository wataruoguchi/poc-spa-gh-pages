import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const defaultConfig = {};
  if (command === "build") {
    // use `index.tsx`
    return {
      ...defaultConfig,
      define: {
        "process.env.NODE_ENV": '"production"',
        "import.meta.env.VITE_CDN_HOST": `"public"`,
      },
      base: "./", // Relative path to the root of the repository
      build: {
        manifest: "manifest.json",
        sourcemap: false,
        rollupOptions: {
          input: "src/main.ts",
          preserveEntrySignatures: "strict",
          output: {
            entryFileNames: "main.js",
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
    return defaultConfig;
  }
});
