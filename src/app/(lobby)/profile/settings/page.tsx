import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import {
  RecentThreads,
  RecentThreadsLoading,
} from "../_components/recent-threads";
import { Suspense } from "react";
import Profile from "./_components/profile";
import { getSession } from "@/actions/session";

export default async function UserProfileSettingsPage() {
  const session = await getSession();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Button asChild>
          <Link href="/create-thread">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Thread
          </Link>
        </Button>
      </div>
      <Profile />

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Threads</h2>
      <Suspense fallback={<RecentThreadsLoading />}>
        <RecentThreads name={session?.user.id as string} />
      </Suspense>
    </div>
  );
}
