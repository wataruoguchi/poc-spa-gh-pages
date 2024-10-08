import { createScriptTag } from "./create-script-tag";
import { fetchAppPathFromManifest } from "./fetch-app-path-from-manifest";

const moduleList = ["react-fragment", "react-tailwind-fragment"];
(async function () {
  Promise.all(
    moduleList.map((module) =>
      fetchAppPathFromManifest(module, "src/index.tsx")
        .then((appPath) => {
          const script = createScriptTag(appPath);
          document.body.after(script);
        })
        .catch((e) => {
          console.error(`Failed to load ${module}`, e);
        }),
    ),
  );
})();
