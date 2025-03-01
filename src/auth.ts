import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "./db";
import { sendResetPassword, sendVerification } from "./actions/emails";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.UsersTable,
    },
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google", "email-password"],
      allowDifferentEmails: false,
    },
  },
  user: {
    additionalFields: {
      likesThread: {
        type: "string[]",
        required: false,
      },
      points: {
        type: "number",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 5, // 5 days
    updateAge: 60 * 60 * 24 * 5, // 1 day (every 1 day the session expiration is updated)
  },
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPassword({
        to: user.email,
        url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ token, user }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;

      await sendVerification({
        name: user.name,
        to: user.email,
        url: verificationUrl,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
