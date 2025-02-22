import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  topic: any;
};

const TopicCard = ({ topic }: Props) => {
  return (
    <Link href={`/topics/${encodeURIComponent(topic.name.toLowerCase())}`}>
      <Card className="hover:bg-muted/50 transition-colors h-full">
        <CardHeader>
          <CardTitle>{topic.name}</CardTitle>
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
