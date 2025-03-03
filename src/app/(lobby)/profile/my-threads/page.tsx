import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PenSquare, ArrowUpDown } from "lucide-react";
import ThreadCard from "@/components/thread-card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// This would typically come from your API or data fetching logic
const dummyMyThreads = [
  {
    id: "1",
    title: "How to implement authentication in Next.js",
    repliesCount: 12,
    likes: 45,
    user: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    id: "2",
    title: "Best practices for state management in React",
    repliesCount: 28,
    likes: 72,
    user: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    id: "3",
    title: "Optimizing database queries in Node.js",
    repliesCount: 8,
    likes: 33,
    user: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
  },
  // Add more dummy threads as needed
];

const MyThreadsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <PenSquare className="mr-2 h-8 w-8 text-primary" />
          My Threads
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
        </div>
      </div> 

      <Suspense fallback={<MyThreadsSkeleton />}>
        <MyThreadsList threads={dummyMyThreads} />
      </Suspense>
    </div>
  );
};

const MyThreadsList = ({ threads }: { threads: any[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

const MyThreadsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[100px] w-full" />
      ))}
    </div>
  );
};

export default MyThreadsPage;
