import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ArrowUpDown } from "lucide-react";
import ThreadCard from "@/components/thread-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// This would typically come from your API or data fetching logic
const dummyLikedThreads = [
  {
    id: "1",
    title: "The future of AI in web development",
    repliesCount: 23,
    likes: 89,
    user: {
      name: "Alice Johnson",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    id: "2",
    title: "Best practices for React performance optimization",
    repliesCount: 45,
    likes: 132,
    user: {
      name: "Bob Smith",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    id: "3",
    title: "Exploring the potential of WebAssembly",
    repliesCount: 17,
    likes: 76,
    user: {
      name: "Charlie Brown",
      image: "https://github.com/shadcn.png",
    },
  },
  // Add more dummy threads as needed
];

const LikedThreadsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Heart className="mr-2 h-8 w-8 text-red-500" />
          Liked Threads
        </h1>
        <div className="flex items-center space-x-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
              <SelectItem value="most-replies">Most Replies</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Suspense fallback={<LikedThreadsSkeleton />}>
        <LikedThreadsList threads={dummyLikedThreads} />
      </Suspense>
    </div>
  );
};

const LikedThreadsList = ({ threads }: { threads: any[] }) => {
  return (
    <div className="flex flex-col space-y-3">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

const LikedThreadsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[100px] w-full" />
      ))}
    </div>
  );
};

export default LikedThreadsPage;
