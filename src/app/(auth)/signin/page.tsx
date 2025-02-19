import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

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
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full">Sign In</Button>
          </div>
        </form>
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
