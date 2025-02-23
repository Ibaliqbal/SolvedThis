import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TThread } from "@/db/schema";

type Props = {
  topic: {
    description: string | undefined;
    threadCount: number;
  } & Pick<TThread, "topic">;
};

const TopicCard = ({ topic }: Props) => {
  return (
    <Link href={`/topics/${encodeURIComponent(topic.topic)}`}>
      <Card className="hover:bg-muted/50 transition-colors h-full">
        <CardHeader className="space-y-2">
          <CardTitle>{topic.topic}</CardTitle>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">{topic.threadCount} threads</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TopicCard;
