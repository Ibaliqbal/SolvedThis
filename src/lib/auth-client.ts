import { createAuthClient } from "better-auth/react";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!, // the base url of your auth server
});
