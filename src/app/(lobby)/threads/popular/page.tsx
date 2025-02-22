import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import ThreadCard from "@/components/thread-card";

// Mock data for popular threads
const popularThreads = [
  {
    id: 1,
    title: "The future of artificial intelligence in 2024",
    author: "AIEnthusiast",
    replies: 156,
    views: 1890,
  },
  {
    id: 2,
    title: "Best practices for remote work productivity",
    author: "RemoteGuru",
    replies: 89,
    views: 1250,
  },
  {
    id: 3,
    title: "Sustainable living: Small changes, big impact",
    author: "EcoWarrior",
    replies: 134,
    views: 2100,
  },
  {
    id: 4,
    title: "The rise of decentralized finance (DeFi)",
    author: "CryptoExpert",
    replies: 201,
    views: 1780,
  },
  {
    id: 5,
    title: "Mental health in the digital age",
    author: "WellnessAdvocate",
    replies: 178,
    views: 2340,
  },
];

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
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
      <div className="text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
