import { Skeleton } from "@/components/ui/skeleton";
import { ReplySkeleton } from "../_components/reply-card";

const Loading = () => {
  return (
    <section className="space-y-6">
      <Skeleton className="w-full h-[200px]" />

      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ReplySkeleton key={i} className="w-full h-[120px]" />
        ))}
      </div>

      <Skeleton className="w-full h-[130px]" />
    </section>
  );
};

export default Loading;
