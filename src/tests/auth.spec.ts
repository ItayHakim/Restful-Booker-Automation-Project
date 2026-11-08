import { responseMessages, statusCodes } from "../mapping/apiMapping";
import { invalidUserCredentials, userCredentials } from "../testData/authData";
import { createToken } from "../utils/authUtils";

describe("Authentication", () => {
  test("create a token with valid credentials", async () => {
    const response = await createToken(userCredentials);

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual({ token: expect.stringMatching(/\S/) });
  });

  test.each([
    {
      scenario: "the password is incorrect",
      credentials: { ...userCredentials, password: invalidUserCredentials.password },
    },
    {
      scenario: "the username does not exist",
      credentials: { ...userCredentials, username: invalidUserCredentials.username },
    },
    {
      scenario: "the username is missing",
      credentials: { password: userCredentials.password },
    },
    {
      scenario: "the password is missing",
      credentials: { username: userCredentials.username },
    },
  ])("do not create a token when $scenario", async ({ credentials }) => {
    const response = await createToken(credentials);

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual({ reason: responseMessages.badCredentials });
  });
});
