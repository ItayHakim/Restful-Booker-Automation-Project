import { urlPaths } from "../config/routes";
import { baseApi } from "../fixtures/baseApi";
import { statusCodes } from "../mapping/apiMapping";

describe("Authentication", () => {
  test("create a token with valid credentials", async () => {
    const response = await baseApi.post(urlPaths.auth, {
      username: process.env.BOOKER_USERNAME || "admin",
      password: process.env.BOOKER_PASSWORD || "password123",
    });

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual({ token: expect.stringMatching(/\S/) });
  });
});
