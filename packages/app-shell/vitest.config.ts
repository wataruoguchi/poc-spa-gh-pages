import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    "import.meta.env.VITE_CDN_HOST": `"http://example.com"`,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/**/*.d.ts", "src/main.ts"],
      thresholds: {
        statements: 80,
        branches: 80,
        lines: 80,
        functions: 80,
      },
      reporter: ["cobertura", "html", "text"],
    },
  },
});
