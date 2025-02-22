import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex justify-center">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            You might want to check the URL for typos or use the navigation
            below to find what you&apos;re looking for.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/topics">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Topics
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
