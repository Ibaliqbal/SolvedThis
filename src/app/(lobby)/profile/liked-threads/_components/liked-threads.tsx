import ThreadCard from "@/components/thread-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getLikedThreads } from "@/actions/threads";

const LikedThreadsList = async () => {
  const threads = await getLikedThreads();

  return (
    <div className="flex flex-col space-y-3 animate-fade-up duration-500">
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

export { LikedThreadsList, LikedThreadsSkeleton };
