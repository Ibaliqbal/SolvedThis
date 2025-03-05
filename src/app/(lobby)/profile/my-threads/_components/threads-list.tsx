import { Skeleton } from "@/components/ui/skeleton";
import ThreadCard from "@/components/thread-card";
import { getUserThreads } from "@/actions/threads";

const ThreadsList = async () => {
  const threads = await getUserThreads();
  return (
    <div className="flex flex-col gap-3">
      {threads.data.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

const ThreadsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[100px] w-full" />
      ))}
    </div>
  );
};

export { ThreadsList, ThreadsSkeleton };
