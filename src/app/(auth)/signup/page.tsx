import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import FormSignUp from "../_components/form-signup";

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
        <FormSignUp />
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
