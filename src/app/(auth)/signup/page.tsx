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
import FormAuthLayout from "@/layouts/form-auth-layout";

export const metadata: Metadata = {
  title: "Create an Account | SolvedThis",
  description:
    "Join our community and start exploring the world of technology. Sign up to create a new account and start contributing to discussions.",
  openGraph: {
    title: "Create an Account | SolvedThis",
    description:
      "Join our community and start exploring the world of technology. Sign up to create a new account and start contributing to discussions.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/signup`,
  },
};

const Page = () => {
  return (
    <FormAuthLayout>
      <section className="md:w-1/2 p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Sign up to join our community</CardDescription>
        </CardHeader>
        <CardContent>
          <FormSignUp />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 w-full">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </section>
    </FormAuthLayout>
  );
};

export default Page;
