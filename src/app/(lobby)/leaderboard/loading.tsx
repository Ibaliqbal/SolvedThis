import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Skeleton key={i} className="w-full h-[120px]" />
  ));
};

export default Loading;
