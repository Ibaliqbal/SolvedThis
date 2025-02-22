import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormReset from "../_components/form-reset";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error as string;
  const token = searchParams.token;

  if (error === "invalid_token" || !token)
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-destructive">
          Invalid Reset Link
        </CardTitle>
        <CardDescription>
          The password reset link is invalid or has expired.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please request a new password reset link to continue.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={"/forgot-password"}>Request New Reset Link</Link>
        </Button>
      </CardFooter>
    </Card>;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <FormReset token={token as string} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Make sure your new password is strong and unique.
        </p>
      </CardFooter>
    </Card>
  );
}
