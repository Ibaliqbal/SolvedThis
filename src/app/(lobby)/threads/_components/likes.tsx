"use client";
import { likeToggleThreads } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

type Props = {
  id: string;
  likes: number;
  isLikeIt: boolean;
};

const Likes = ({ likes, isLikeIt, id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useState(likes);
  const [optimisticIsLikeIt, setOptimisticIsLikeIt] = useState(isLikeIt);

  const handleLike = async () => {
    setOptimisticLikes(optimisticLikes + (optimisticIsLikeIt ? -1 : 1));
    setOptimisticIsLikeIt(!optimisticIsLikeIt);

    // Kemudian kirim request ke server
    const res = await likeToggleThreads(optimisticIsLikeIt, id);

    if (!res.status) {
      setOptimisticLikes(optimisticLikes);
      setOptimisticIsLikeIt(optimisticIsLikeIt);
      toast.error(res.message);
    }
  };

  return (
    <Button
      variant={optimisticIsLikeIt ? "destructive" : "ghost"}
      size="sm"
      className="dark:text-muted-foreground dark:hover:text-foreground"
      onClick={() => {
        startTransition(handleLike);
      }}
      disabled={isPending}
    >
      <ThumbsUp className="w-4 h-4 mr-2" />
      {optimisticLikes}
    </Button>
  );
};

export default Likes;
