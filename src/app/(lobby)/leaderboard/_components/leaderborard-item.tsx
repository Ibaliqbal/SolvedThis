import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import Link from "next/link";

const LeaderboardItem = ({
  user,
  rank,
}: {
  user: {
    name: string;
    image: string | null;
    level: number;
    totalPosts: number;
    id: string;
  };
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
    <Link
      href={`/profile/${encodeURIComponent(user.name)}`}
      className="flex items-center space-x-4 py-4"
    >
      <div className="flex-shrink-0 w-8 text-center">{getRankIcon(rank)}</div>
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.image ?? ""} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground">Level {user.level}</p>
      </div>
      <Badge variant="secondary">{user.totalPosts} posts</Badge>
    </Link>
  );
};

export default LeaderboardItem;
