import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for threads
const threads = [
  {
    id: 1,
    title: "Best programming languages for beginners",
    author: "johndoe",
    replies: 15,
    views: 100,
  },
  {
    id: 2,
    title: "How to optimize your website for speed",
    author: "janedoe",
    replies: 8,
    views: 75,
  },
  {
    id: 3,
    title: "The future of artificial intelligence",
    author: "bobsmith",
    replies: 20,
    views: 150,
  },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">
        {params.slug} Discussions
      </h1>
      <div className="flex flex-col gap-4">
        {threads.map((thread) => (
          <Link key={thread.id} href={`/threads/${thread.id}`}>
            <Card className="hover:bg-muted/50 transition-colors animate-fade-up">
              <CardHeader>
                <div className="flex md:items-center justify-between md:flex-row flex-col gap-2">
                  <CardTitle>{thread.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{thread.replies} replies</span>
                    <span>•</span>
                    <span>{thread.views} views</span>
                  </div>
                </div>
                <CardDescription className="flex items-center mt-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${thread.author}`}
                    />
                    <AvatarFallback>
                      {thread.author[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{thread.author}</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
