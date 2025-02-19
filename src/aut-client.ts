import { createAuthClient } from "better-auth/react";
export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // the base url of your auth server
});
