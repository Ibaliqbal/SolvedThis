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

export const metadata: Metadata = {
  title: "Signin - SolvedThis",
  description:
    "Masuk ke SolvedThis untuk mengakses berbagai topik menarik dan bergabung dengan komunitas kami. Temukan diskusi yang sesuai dengan minat Anda dan mulai berbagi pengalaman sekarang!",
};

const Page = () => {
  return (
    <section className="md:w-1/2 p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <FormSignin />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400  w-full">
          Don{"'"}t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </section>
  );
};

export default Page;
