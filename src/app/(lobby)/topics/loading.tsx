import { Skeleton } from "@/components/ui/skeleton";
import { topics } from "@/config/topics";
const Loading = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Skeleton key={topic.name} className="w-full h-[150px]" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
