import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

const Loading = () => {
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
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[130px]" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
