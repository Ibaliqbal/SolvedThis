import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        return <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />;
      default:
        return (
          <span className="text-base sm:text-lg font-bold text-muted-foreground">
            {rank}
          </span>
        );
    }
  };

  return (
    <Link
      href={`/profile/${encodeURIComponent(user.name)}`}
      className="group flex items-center gap-2 sm:gap-4 py-3 px-2 rounded-lg transition-colors hover:bg-muted/50"
    >
      <div
        className={cn(
          "flex-shrink-0 w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-full",
          rank <= 3 ? "bg-muted/50" : ""
        )}
      >
        {getRankIcon(rank)}
      </div>

      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border">
        <AvatarImage src={user.image ?? ""} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-grow min-w-0">
        <p className="font-semibold truncate">{user.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Level {user.level}
          </p>
        </div>
      </div>

      <Badge variant="secondary" className="ml-auto flex-shrink-0">
        {user.totalPosts} posts
      </Badge>
    </Link>
  );
};

export default LeaderboardItem;
