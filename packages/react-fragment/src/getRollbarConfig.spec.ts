import { getRollbarConfig } from "./getRollbarConfig";
import { loadEnv } from "./load-env";

vi.mock("./load-env");

describe("getRollbarConfig", () => {
  describe("When the access token is not set", () => {
    beforeEach(() => {
      // Mock loadEnv
      vi.mocked(loadEnv).mockReturnValueOnce({
        VITE_ROLLBAR_ACCESS_TOKEN_CLIENT: "",
        VITE_GIT_VERSION: "",
      });
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should return undefined", () => {
      expect(getRollbarConfig()).toBeUndefined();
    });
  });

  describe("When the access token is set", () => {
    const fakeAccessToken = "test";

    beforeEach(() => {
      // Mock loadEnv
      vi.mocked(loadEnv).mockReturnValueOnce({
        VITE_ROLLBAR_ACCESS_TOKEN_CLIENT: fakeAccessToken,
        VITE_GIT_VERSION: "",
      });
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should return the rollbar config", () => {
      expect(getRollbarConfig()?.accessToken).toBe(fakeAccessToken);
    });
  });
});
