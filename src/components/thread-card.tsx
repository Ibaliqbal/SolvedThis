import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {
  thread: any;
};

const ThreadCard = ({ thread }: Props) => {
  return (
    <Link href={`/threads/${thread.id}`} prefetch={true}>
      <Card className="hover:bg-muted/50 transition-colors animate-fade-up">
        <CardHeader>
          <div className="flex md:items-center justify-between md:flex-row flex-col gap-2">
            <CardTitle>{thread.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{thread.repliesCount} replies</span>
              <span>•</span>
              <span>{thread.likes} likes</span>
            </div>
          </div>
          <CardDescription className="flex items-center mt-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={thread.user.image} />
              <AvatarFallback>
                {thread.user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{thread.user.name}</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ThreadCard;
