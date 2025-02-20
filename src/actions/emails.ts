"use server";

import { Resend } from "resend";
import Verification from "@/emails/Verification";

export async function sendVerification({
  to,
  url,
  name,
}: {
  to: string;
  url: string;
  name: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) throw new Error("No API key");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const options = {
    from: "onboarding@resend.dev",
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
