import { createScriptTag } from "./create-script-tag";

describe("createScriptTag", () => {
  it("should create a script tag", () => {
    const appPath = "http://example.com/";
    const script = createScriptTag(appPath);
    expect(script.src).toBe(appPath);
    expect(script.type).toBe("module");
  });
});
