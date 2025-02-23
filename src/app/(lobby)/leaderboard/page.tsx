import { getLeaderboard } from "@/actions/user";
import LeaderboardItem from "./_components/leaderborard-item";


export default async function LeaderboardPage() {
  const leaderboards = await getLeaderboard();
  console.log(leaderboards);
  return leaderboards.map((user, index) => (
    <LeaderboardItem key={user.id} user={user} rank={index + 1} />
  ));
}
