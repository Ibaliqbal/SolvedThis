import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { EditProfile } from "./_components/edit-profile";
import { calculateUserLevel, dateFormat } from "@/utils/helper";
import ThreadCard from "@/components/thread-card";

// Dummy data for user profile
const user = {
  username: "johndoe",
  name: "John Doe",
  joinDate: "2023-01-01",
  threadCount: 15,
  commentCount: 87,
  level: 3,
  currentPoints: 750,
  nextLevelPoints: 1000,
};

// Dummy data for user's recent threads
const recentThreads = [
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

export default async function UserProfileSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <div>Not authenticated</div>;

  const levelInfo = calculateUserLevel(session.user.points);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Button asChild>
          <Link href="/create-thread">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Thread
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="grow flex md:flex-row flex-col gap-4">
            <div className="grow">
              <CardTitle className="text-2xl">{session?.user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                @{session?.user.name.toLowerCase().split(" ").join("")}
              </p>
            </div>
            <EditProfile />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Joined</p>
              <p className="text-sm text-muted-foreground">
                {dateFormat(session.user.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Threads</p>
              <p className="text-sm text-muted-foreground">
                {user.threadCount}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Comments</p>
              <p className="text-sm text-muted-foreground">
                {user.commentCount}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Level</p>
              <p className="text-sm text-muted-foreground">
                {levelInfo.currentLevel.level}
              </p>
            </div>
            <div className="col-span-2 mt-4 w-fit">
              <p className="text-sm font-medium mb-2">Progress to Next Level</p>
              <Progress value={levelInfo.progress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-1">
                {session.user.points} / {levelInfo.nextLevel?.pointsNeeded}{" "}
                points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Threads</h2>
      <div className="space-y-4">
        {recentThreads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
