import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { dateFormat } from "@/utils/helper";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  reply: any;
};

const ReplyCard = ({ reply }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`https://avatar.vercel.sh/${reply.author}`} />
            <AvatarFallback>{reply.author[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{reply.author}</span>
          <span>•</span>
          <span>{dateFormat(reply.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(reply.content),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ReplyCard;
