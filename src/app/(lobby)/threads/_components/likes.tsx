import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

const Likes = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground"
    >
      <ThumbsUp className="w-4 h-4 mr-2" />
      1000
    </Button>
  );
};

export default Likes;
