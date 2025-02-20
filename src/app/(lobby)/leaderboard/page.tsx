import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

// Mock data for the leaderboard
const users = [
  {
    id: 1,
    username: "SuperUser123",
    level: 50,
    posts: 1250,
    avatar: "https://avatar.vercel.sh/SuperUser123",
    joinedAt: "2021-03-15",
  },
  {
    id: 2,
    username: "CodeMaster",
    level: 48,
    posts: 1100,
    avatar: "https://avatar.vercel.sh/CodeMaster",
    joinedAt: "2021-05-22",
  },
  {
    id: 3,
    username: "DiscussionKing",
    level: 47,
    posts: 980,
    avatar: "https://avatar.vercel.sh/DiscussionKing",
    joinedAt: "2021-06-10",
  },
  {
    id: 4,
    username: "TechGuru",
    level: 45,
    posts: 920,
    avatar: "https://avatar.vercel.sh/TechGuru",
    joinedAt: "2021-07-05",
  },
  {
    id: 5,
    username: "DebateChamp",
    level: 44,
    posts: 890,
    avatar: "https://avatar.vercel.sh/DebateChamp",
    joinedAt: "2021-08-18",
  },
  {
    id: 6,
    username: "ForumExpert",
    level: 43,
    posts: 850,
    avatar: "https://avatar.vercel.sh/ForumExpert",
    joinedAt: "2021-09-30",
  },
  {
    id: 7,
    username: "TopContributor",
    level: 42,
    posts: 820,
    avatar: "https://avatar.vercel.sh/TopContributor",
    joinedAt: "2021-11-12",
  },
  {
    id: 8,
    username: "InsightfulMind",
    level: 41,
    posts: 800,
    avatar: "https://avatar.vercel.sh/InsightfulMind",
    joinedAt: "2022-01-07",
  },
  {
    id: 9,
    username: "KnowledgeSeeker",
    level: 40,
    posts: 780,
    avatar: "https://avatar.vercel.sh/KnowledgeSeeker",
    joinedAt: "2022-02-14",
  },
  {
    id: 10,
    username: "CommunityPillar",
    level: 39,
    posts: 760,
    avatar: "https://avatar.vercel.sh/CommunityPillar",
    joinedAt: "2022-03-23",
  },
];

const LeaderboardItem = ({
  user,
  rank,
}: {
  user: (typeof users)[0];
  rank: number;
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <span className="text-lg font-bold text-muted-foreground">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      <div className="flex-shrink-0 w-8 text-center">{getRankIcon(rank)}</div>
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback>{user.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-muted-foreground">Level {user.level}</p>
      </div>
      <Badge variant="secondary">{user.posts} posts</Badge>
    </div>
  );
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Top contributors in our community
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Top Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {users.map((user, index) => (
              <LeaderboardItem key={user.id} user={user} rank={index + 1} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground">
          Keep contributing to climb the ranks! Check out our{" "}
          <a href="/guidelines" className="text-primary hover:underline">
            community guidelines
          </a>{" "}
          to learn how to level up.
        </p>
      </div>
    </div>
  );
}
