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
import LoginGoogle from "../_components/login-google";
import LoginGithub from "../_components/login-github";
import FormAuthLayout from "@/layouts/form-auth-layout";

export const metadata: Metadata = {
  title: "Signin - SolvedThis",
  description:
    "Masuk ke SolvedThis untuk mengakses berbagai topik menarik dan bergabung dengan komunitas kami. Temukan diskusi yang sesuai dengan minat Anda dan mulai berbagi pengalaman sekarang!",
};

const Page = () => {
  return (
    <FormAuthLayout>
      <section className="md:w-1/2 p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <LoginGoogle />
            <LoginGithub />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
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
