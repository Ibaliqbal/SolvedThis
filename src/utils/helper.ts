import { LEVEL_SYSTEM } from "@/config/user";
import { LevelData } from "@/types/user";
import { format } from "date-fns";

export function calculateUserLevel(points: number): {
  currentLevel: LevelData;
  nextLevel: LevelData | null;
  progress: number;
  pointsToNext: number;
} {
  let currentLevel = LEVEL_SYSTEM[0];
  let nextLevel = LEVEL_SYSTEM[1];

  for (let i = 0; i < LEVEL_SYSTEM.length; i++) {
    if (points >= LEVEL_SYSTEM[i].pointsNeeded) {
      currentLevel = LEVEL_SYSTEM[i];
      nextLevel = LEVEL_SYSTEM[i + 1] || null;
    } else {
      break;
    }
  }

  const pointsToNext = nextLevel ? nextLevel.pointsNeeded - points : 0;

  const progress = nextLevel
    ? ((points - currentLevel.pointsNeeded) /
        (nextLevel.pointsNeeded - currentLevel.pointsNeeded)) *
      100
    : 100;

  return {
    currentLevel,
    nextLevel,
    progress: Math.min(Math.max(progress, 0), 100),
    pointsToNext,
  };
}

// async function infoProfile(id: string) {
//   const
// }

export function dateFormat(date: Date | string): string {
  return format(date, "LLL dd, yyy");
}
