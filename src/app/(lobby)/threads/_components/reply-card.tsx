import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { domSanitizeConfig } from "@/config/thread";
import { TComment, TUser } from "@/db/schema";
import { dateFormat } from "@/utils/helper";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

type Props = {
  reply: Pick<TComment, "id" | "content" | "createdAt"> & {
    user: Pick<TUser, "name" | "image">;
  };
};

const ReplyCard = ({ reply }: Props) => {
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={reply.user.image ?? ""} />
            <AvatarFallback>{reply.user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Link href={`/profile/${encodeURIComponent(reply.user.name)}`}>
            <span>{reply.user.name}</span>
          </Link>
          <span>•</span>
          <span>{dateFormat(reply.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(reply.content, domSanitizeConfig),
          }}
        />
      </CardContent>
    </Card>
  );
};

export const ReplySkeleton = () => {
  return <Skeleton className="w-full h-[120px]" />;
};

export { ReplyCard };
