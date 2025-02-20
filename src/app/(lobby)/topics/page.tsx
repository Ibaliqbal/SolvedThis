import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { topics } from "@/config/topics";

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics
          .map((topic) => ({
            ...topic,
            slug: topic.name.toLowerCase(),
            threadCount: Math.floor(Math.random() * 150) + 1,
          }))
          .map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${encodeURIComponent(topic.slug)}`}
            >
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
          ))}
      </div>
    </div>
  );
}
