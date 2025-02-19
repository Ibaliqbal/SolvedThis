import { Resend } from "resend";
import Verification from "@/emails/Verification";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  const { fullName, to } = await req.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Welcome to Resend!",
      react: Verification({ fullName }),
    });
  } catch (error) {
    console.log(error);
  }

  return Response.json(
    {
      message: "Success",
    },
    { status: 200 }
  );
};
