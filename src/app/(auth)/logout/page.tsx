"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LogoutConfirmationPage() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onRequest: () => {
          setPending(true);
        },
      },
    });
    setPending(false);
  };

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Are you sure you want to log out?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <LogOut className="h-16 w-16 text-primary mx-auto" />
            <p className="text-muted-foreground">
              You&apos;re about to be logged out of your account. Are you sure
              you want to continue?
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <Button
            disabled={pending}
            variant="outline"
            className="w-full"
            onClick={handleCancel}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button disabled={pending} className="w-full" onClick={handleLogout}>
            {pending ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
