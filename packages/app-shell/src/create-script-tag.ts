export function createScriptTag(appPath: string) {
  const script = document.createElement("script");
  script.src = `${appPath}`;
  script.type = "module";
  return script;
}
