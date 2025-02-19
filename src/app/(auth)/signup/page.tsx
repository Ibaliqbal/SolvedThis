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
  title: "Create an Account - Next.js Community",
  description:
    "Join our community and start exploring the world of technology. Sign up to create a new account and start contributing to discussions.",
};

const Page = () => {
  return (
    <section className="md:w-1/2 p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Sign up to join our community</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Full Name
              </label>
              <Input id="name" placeholder="John Doe" />
            </div>
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
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confirm Password
              </label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full">Sign Up</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 w-full">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </section>
  );
};

export default Page;
