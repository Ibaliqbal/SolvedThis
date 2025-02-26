import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import FormForgot from "../_components/form-forgot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | SolvedThis",
  description:
    "Reset your password using this secure and easy-to-use interface.",
  openGraph: {
    title: "Forgot Password | SolvedThis",
    description:
      "Reset your password using this secure and easy-to-use interface.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password`,
  },
};

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormForgot />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/signin"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4 inline" />
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
