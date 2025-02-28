import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import FormSignin from "../_components/form-signin";

import FormAuthLayout from "@/layouts/form-auth-layout";

export const metadata: Metadata = {
  title: "Signin | SolvedThis",
  description:
    "Log in to SolvedThis to access a variety of interesting topics and join our community. Find discussions that match your interests and start sharing your experiences now!",
  openGraph: {
    title: "Signin | SolvedThis",
    description:
      "Log in to SolvedThis to access a variety of interesting topics and join our community. Find discussions that match your interests and start sharing your experiences now!",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/signin`,
  },
};

const Page = () => {
  return (
    <FormAuthLayout>
      <section className="md:w-1/2 p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <FormSignin />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            <Link
              href="/forgot-password"
              className="hover:text-primary underline underline-offset-4"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </section>
    </FormAuthLayout>
  );
};

export default Page;
