import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

// Mock data for popular threads
const popularThreads = [
  {
    id: 1,
    title: "The future of artificial intelligence in 2024",
    author: "AIEnthusiast",
    category: "Technology",
    replies: 156,
    views: 1890,
    createdAt: "2023-07-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Best practices for remote work productivity",
    author: "RemoteGuru",
    category: "Work",
    replies: 89,
    views: 1250,
    createdAt: "2023-07-14T14:45:00Z",
  },
  {
    id: 3,
    title: "Sustainable living: Small changes, big impact",
    author: "EcoWarrior",
    category: "Lifestyle",
    replies: 134,
    views: 2100,
    createdAt: "2023-07-13T09:15:00Z",
  },
  {
    id: 4,
    title: "The rise of decentralized finance (DeFi)",
    author: "CryptoExpert",
    category: "Finance",
    replies: 201,
    views: 1780,
    createdAt: "2023-07-12T16:20:00Z",
  },
  {
    id: 5,
    title: "Mental health in the digital age",
    author: "WellnessAdvocate",
    replies: 178,
    views: 2340,
    createdAt: "2023-07-11T11:00:00Z",
  },
];

const PopularThreadCard = ({
  thread,
}: {
  thread: (typeof popularThreads)[0];
}) => {
  return (
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
              <AvatarImage src={`https://avatar.vercel.sh/${thread.author}`} />
              <AvatarFallback>{thread.author[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{thread.author}</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default function PopularThreadsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Popular Threads</h1>
        <Badge variant="secondary" className="text-lg py-1">
          <TrendingUp className="mr-1 h-5 w-5" />
          Trending Now
        </Badge>
      </div>
      <p className="text-xl text-muted-foreground">
        Discover the hottest discussions in our community
      </p>
      <div className="flex flex-col gap-4">
        {popularThreads.map((thread) => (
          <PopularThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
      <div className="text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
