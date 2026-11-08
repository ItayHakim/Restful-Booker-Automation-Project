export type UserCredentialsType = {
  username: string;
  password: string;
};

export type AuthResponseType = { token: string } | { reason: string };
