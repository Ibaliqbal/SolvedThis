"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

const Loading = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">{slug} Discussions</h1>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full  h-[130px]" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
