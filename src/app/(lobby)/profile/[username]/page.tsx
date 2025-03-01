import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getUserProfile } from "@/actions/user";
import { notFound } from "next/navigation";
import { calculateUserLevel, dateFormat } from "@/utils/helper";
import { Suspense } from "react";
import {
  RecentThreads,
  RecentThreadsLoading,
} from "../_components/recent-threads";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { username: string };
}): Metadata => {
  const username = decodeURIComponent(params.username);
  return {
    title: `${username} | SolvedThis`,
    description: `Check out ${username}'s profile and recent discussions`,
    openGraph: {
      title: `${username} | SolvedThis`,
      description: `Check out ${username}'s profile and recent discussions`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${username}`,
    },
  };
};

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = decodeURIComponent(params.username);
  const user = await getUserProfile(username);

  if (!user) notFound();

  const levelInfo = calculateUserLevel(user.points);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              @{user.name.toLowerCase().split(" ").join("")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Joined</p>
              <p className="text-sm text-muted-foreground">
                {dateFormat(user.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Threads</p>
              <p className="text-sm text-muted-foreground">
                {user.threadsCount}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Comments</p>
              <p className="text-sm text-muted-foreground">
                {user.repliesCount}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Level</p>
              <p className="text-sm text-muted-foreground">
                {levelInfo.currentLevel.level}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Bio</h3>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                !user.bio && "italic"
              )}
            >
              {user?.bio ? user.bio : "This user has no bio information..."}
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Threads</h2>
      <Suspense fallback={<RecentThreadsLoading />}>
        <RecentThreads name={user.id as string} />
      </Suspense>
    </div>
  );
}
