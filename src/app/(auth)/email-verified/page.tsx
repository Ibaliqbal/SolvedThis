import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, User, MessageSquare } from "lucide-react";

export default function EmailVerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Email Verified!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Congratulations! Your email has been successfully verified.
          </p>
          <p className="text-sm text-muted-foreground">
            You now have full access to all features of ForumApp. Here are some
            things you can do next:
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <User className="h-8 w-8 mx-auto text-primary" />
              <p className="mt-2 text-sm font-medium">Complete your profile</p>
            </div>
            <div className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-primary" />
              <p className="mt-2 text-sm font-medium">Join a discussion</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">Start Exploring</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/profile/settings">Complete Your Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
