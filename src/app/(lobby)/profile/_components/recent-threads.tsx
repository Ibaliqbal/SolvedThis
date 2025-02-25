import { getRecentsThread } from "@/actions/threads";
import ThreadCard from "@/components/thread-card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  name: string;
};

const RecentThreads = async ({ name }: Props) => {
  const threads = await getRecentsThread(name);
  return (
    <div className="flex flex-col gap-3">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

const RecentThreadsLoading = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-[130px]" />
      ))}
    </div>
  );
};

export { RecentThreads, RecentThreadsLoading };
