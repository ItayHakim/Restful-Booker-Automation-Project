import { statusCodes } from "../mapping/apiMapping";
import { userCredentials } from "../testData/authData";
import { createToken } from "../utils/authUtils";

describe("Authentication", () => {
  test("create a token with valid credentials", async () => {
    const response = await createToken(userCredentials);

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual({ token: expect.stringMatching(/\S/) });
  });
});
