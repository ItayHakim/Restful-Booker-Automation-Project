import { urlPaths } from "../config/routes";
import { baseApi } from "../fixtures/baseApi";
import { statusCodes } from "../mapping/apiMapping";

describe("API health check", () => {
  test("restful booker is available", async () => {
    const response = await baseApi.get(urlPaths.ping);

    expect(response.status).toBe(statusCodes.created);
  });
});
