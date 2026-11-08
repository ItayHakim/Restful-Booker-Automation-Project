import { UserCredentialsType } from "../models/authTypes";

// Public demo credentials from the Restful Booker documentation.
export const userCredentials: UserCredentialsType = {
  username: process.env.BOOKER_USERNAME || "admin",
  password: process.env.BOOKER_PASSWORD || "password123",
};

export const invalidUserCredentials: UserCredentialsType = {
  username: "invalid-user",
  password: "invalid-password",
};
