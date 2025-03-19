import { Suspense } from "react";
import { Heart } from "lucide-react";
import {
  LikedThreadsList,
  LikedThreadsSkeleton,
} from "./_components/liked-threads";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liked Threads | SolvedThis",
  description: "Check out the threads you've been following",
  openGraph: {
    title: "Liked Threads | SolvedThis",
    description: "Check out the threads you've been following",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/liked-threads`,
  },
};

const LikedThreadsPage = async () => {
  return (
    <div className="container md:px-7 px-2 py-8">
      <h1 className="text-3xl font-bold flex items-center mb-6">
        <Heart className="mr-2 h-8 w-8 text-red-500" />
        Liked Threads
      </h1>

      <Suspense fallback={<LikedThreadsSkeleton />}>
        <LikedThreadsList />
      </Suspense>
    </div>
  );
};

export default LikedThreadsPage;
