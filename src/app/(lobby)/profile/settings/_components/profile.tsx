import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { EditProfile } from "./edit-profile";
import { Progress } from "@/components/ui/progress";
import { calculateUserLevel, dateFormat } from "@/utils/helper";
import { getProfile } from "@/actions/user";

const Profile = async () => {
  const user = await getProfile();
  const levelInfo = calculateUserLevel(user?.points ?? 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="grow flex md:flex-row flex-col gap-4">
          <div className="grow">
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              @{user?.name.toLowerCase().split(" ").join("")}
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
              {dateFormat(user?.createdAt as Date)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Threads</p>
            <p className="text-sm text-muted-foreground">
              {user?.threadsCount}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Comments</p>
            <p className="text-sm text-muted-foreground">
              {user?.repliesCount}
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
              {user?.points} / {levelInfo.nextLevel?.pointsNeeded} points
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
