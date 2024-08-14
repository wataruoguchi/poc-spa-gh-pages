import { loadEnv } from "./load-env";

type FragmentManifest = {
  [key: string]: {
    file: string;
  };
};

export async function fetchAppPathFromManifest(
  fragmentName: string,
  originalFileName = "src/single-spa-app.tsx",
): Promise<string> {
  const cdnHost = loadEnv().VITE_CDN_HOST;
  try {
    const response = await fetch(
      `${cdnHost}/${fragmentName}/manifest.json?time=${Date.now()}`, // Using timestamp to never let browser use cached manifest.
    );
    const manifest: FragmentManifest = await response.json();
    const sourcePath = `${cdnHost}/${fragmentName}/${manifest[originalFileName].file}`;
    return sourcePath;
  } catch (error) {
    throw new Error(`Failed to fetch manifest for ${fragmentName}`);
  }
}
