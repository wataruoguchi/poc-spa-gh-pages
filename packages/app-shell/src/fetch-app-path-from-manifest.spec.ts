import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { fetchAppPathFromManifest } from "./fetch-app-path-from-manifest";
import { loadEnv } from "./load-env";

const manifest = {
  "_vendor-ab8bafa4.js": {
    file: "assets/vendor-ab8bafa4.js",
  },
  "src/single-spa-app.tsx": {
    file: "assets/single-spa-app-b10522a7.js",
    imports: ["_vendor-ab8bafa4.js"],
    isEntry: true,
    src: "src/single-spa-app.tsx",
  },
};

describe("fetchAppPathFromManifest", () => {
  const fragmentName = "mfa-dummy-app";

  describe("When manifest is successfully loaded", () => {
    const restHandlers = [
      http.get(
        `${loadEnv().VITE_CDN_HOST}/${fragmentName}/manifest.json`,
        () => {
          return HttpResponse.json(manifest);
        },
      ),
    ];
    const server = setupServer(...restHandlers);

    beforeAll(() => {
      server.listen();
    });

    afterAll(() => {
      server.close();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    it("returns the path to the app", async () => {
      const result = await fetchAppPathFromManifest(fragmentName);
      expect(result).toBe(
        `${loadEnv().VITE_CDN_HOST}/${fragmentName}/${manifest["src/single-spa-app.tsx"].file}`,
      );
    });
  });

  describe("When manifest is not found", () => {
    const restHandlers = [
      http.get(
        `${loadEnv().VITE_CDN_HOST}/${fragmentName}/manifest.json`,
        () => {
          return HttpResponse.error();
        },
      ),
    ];
    const server = setupServer(...restHandlers);

    beforeAll(() => {
      server.listen();
    });

    afterAll(() => {
      server.close();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    it("returns the path to the app", async () => {
      await expect(fetchAppPathFromManifest(fragmentName)).rejects.toThrow();
    });
  });
});
