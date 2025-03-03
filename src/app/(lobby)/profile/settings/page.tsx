import { Button } from "@/components/ui/button";
import { Heart, PlusCircle } from "lucide-react";
import Link from "next/link";

import {
  RecentThreads,
  RecentThreadsLoading,
} from "../_components/recent-threads";
import { Suspense } from "react";
import Profile from "./_components/profile";
import { getSession } from "@/actions/session";
import { Metadata } from "next";
import {
  ConnectedAccounts,
  ConnectedAccountsLoading,
} from "./_components/connected-accounts";

export const metadata: Metadata = {
  title: "User Profile | SolvedThis",
  description: "View your profile and recent discussions",
  openGraph: {
    title: "User Profile | SolvedThis",
    description: "View your profile and recent discussions",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/settings`,
  },
};

export default async function UserProfileSettingsPage() {
  const session = await getSession();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <div className="space-x-2">
          <Button asChild variant="outline">
            <Link href="/profile/liked-threads">
              <Heart className="mr-2 h-4 w-4" />
              Liked Threads
            </Link>
          </Button>
          <Button asChild>
            <Link href="/create-thread">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Thread
            </Link>
          </Button>
        </div>
      </div>
      <Profile />
      <Suspense fallback={<ConnectedAccountsLoading />}>
        <ConnectedAccounts />
      </Suspense>

      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-2xl font-bold">Recent Threads</h2>
        <Button variant="link">
          <Link href={"/profile/my-threads"}>View all</Link>
        </Button>
      </div>
      <Suspense fallback={<RecentThreadsLoading />}>
        <RecentThreads name={session?.user.id as string} />
      </Suspense>
    </div>
  );
}
