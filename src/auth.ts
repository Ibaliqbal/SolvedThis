import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/db/index";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
  },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
