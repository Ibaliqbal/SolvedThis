import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import ThreadCard from "@/components/thread-card";
import { getPopularThreads } from "@/actions/threads";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular Threads | SolvedThis",
  description: "Discover the hottest discussions in our community",
  openGraph: {
    title: "Popular Threads | SolvedThis",
    description: "Discover the hottest discussions in our community",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/threads/popular`,
  },
};

export default async function PopularThreadsPage() {
  const threads = await getPopularThreads();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Popular Threads</h1>
        <Badge variant="secondary" className="text-lg py-1">
          <TrendingUp className="mr-1 h-5 w-5" />
          Trending Now
        </Badge>
      </div>
      <p className="text-xl text-muted-foreground">
        Discover the hottest discussions in our community
      </p>
      <div className="flex flex-col gap-4">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
