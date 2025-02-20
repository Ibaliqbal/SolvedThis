import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
    createdAt: "2023-04-01T12:00:00Z",
  },
  {
    id: 2,
    title: "How to optimize your website for speed",
    createdAt: "2023-03-28T10:30:00Z",
  },
  {
    id: 3,
    title: "The future of artificial intelligence",
    createdAt: "2023-03-25T15:45:00Z",
  },
];

export default function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = decodeURIComponent(params.username);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Joined</p>
              <p className="text-sm text-muted-foreground">
                {new Date(user.joinDate).toLocaleDateString()}
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
              <p className="text-sm text-muted-foreground">{user.level}</p>
            </div>
            <div className="col-span-2 mt-4 w-fit">
              <p className="text-sm font-medium mb-2">Progress to Next Level</p>
              <Progress
                value={(user.currentPoints / user.nextLevelPoints) * 100}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {user.currentPoints} / {user.nextLevelPoints} points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Threads</h2>
      <div className="space-y-4">
        {recentThreads.map((thread) => (
          <Card key={thread.id}>
            <CardHeader>
              <CardTitle>{thread.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(thread.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
