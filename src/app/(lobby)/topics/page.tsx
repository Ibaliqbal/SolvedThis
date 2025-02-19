import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topics = [
  {
    slug: "technology",
    name: "Technology",
    description: "Discuss the latest in tech",
    threadCount: 120,
    followers: 1500,
  },
  {
    slug: "gaming",
    name: "Gaming",
    description: "Share your gaming experiences",
    threadCount: 85,
    followers: 1200,
  },
  {
    slug: "movies",
    name: "Movies",
    description: "Talk about your favorite films",
    threadCount: 95,
    followers: 1300,
  },
  {
    slug: "books",
    name: "Books",
    description: "Explore the world of literature",
    threadCount: 75,
    followers: 1000,
  },
  {
    slug: "sports",
    name: "Sports",
    description: "Discuss sports and athletics",
    threadCount: 110,
    followers: 1400,
  },
  {
    slug: "music",
    name: "Music",
    description: "Share your musical interests",
    threadCount: 100,
    followers: 1350,
  },
];

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/topics/${topic.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{topic.name}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{topic.threadCount} threads</Badge>
                  <span className="text-sm text-muted-foreground">
                    {topic.followers} followers
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
