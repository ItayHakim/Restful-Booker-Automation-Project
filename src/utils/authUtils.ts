import { urlPaths } from "../config/routes";
import { baseApi } from "../fixtures/baseApi";
import { statusCodes } from "../mapping/apiMapping";
import { AuthResponseType, UserCredentialsType } from "../models/authTypes";
import { userCredentials } from "../testData/authData";

export async function createToken(credentials: Partial<UserCredentialsType> = userCredentials) {
  return baseApi.post<AuthResponseType>(urlPaths.auth, credentials);
}

export async function getAuthToken(): Promise<string> {
  const response = await createToken();
  expect(response.status).toBe(statusCodes.ok);

  if (!("token" in response.data)) {
    throw new Error("Authentication failed: the API did not return a token");
  }

  expect(response.data.token).toEqual(expect.any(String));
  expect(response.data.token.length).toBeGreaterThan(0);
  return response.data.token;
}
