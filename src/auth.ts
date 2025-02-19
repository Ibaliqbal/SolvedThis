import { betterAuth, BetterAuthOptions } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
} satisfies BetterAuthOptions);
