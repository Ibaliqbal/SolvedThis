"use server";

import { Resend } from "resend";
import Verification from "@/emails/Verification";
import ResetPassword from "@/emails/ResetPassword";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM! ?? "";

export async function sendVerification({
  to,
  url,
  name,
}: {
  to: string;
  url: string;
  name: string;
}) {
  if (!resendApiKey) throw new Error("No API key");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const options = {
    from: emailFrom,
    to,
    subject: "Welcome to SolvedThis",
    react: Verification({ username: name, verificationLink: url }),
  };

  try {
    await resend.emails.send(options);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
}

export async function sendResetPassword({
  to,
  url,
}: {
  to: string;
  url: string;
}) {
  if (!resendApiKey) throw new Error("No API key");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const options = {
    from: emailFrom,
    to,
    subject: "Reset Your SolvedThis Password",
    react: ResetPassword({ resetPasswordLink: url }),
  };

  try {
    await resend.emails.send(options);

    return {
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
    };
  }
}
