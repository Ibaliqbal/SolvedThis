import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

type Props = {
  id: string;
  likes: number;
};

const Likes = ({ likes }: Props) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground"
    >
      <ThumbsUp className="w-4 h-4 mr-2" />
      {likes}
    </Button>
  );
};

export default Likes;
