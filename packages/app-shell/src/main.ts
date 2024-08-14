import { createScriptTag } from "./create-script-tag";
import { fetchAppPathFromManifest } from "./fetch-app-path-from-manifest";

window.addEventListener("load", () => {
  const moduleList = ["react-fragment"];
  (async function () {
    Promise.all(
      moduleList.map((module) =>
        fetchAppPathFromManifest(module, "src/index.tsx").then((appPath) => {
          const script = createScriptTag(appPath);
          document.body.after(script);
        }),
      ),
    );
  })();
});
