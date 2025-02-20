import { LevelData } from "@/types/user";

export const LEVEL_SYSTEM: LevelData[] = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1;
  const pointsNeeded =
    level === 1 ? 0 : Math.floor(100 * Math.pow(1.2, level - 1));

  // Rumus pointsUp:
  // Level 1-10: 5 poin
  // Level 11-20: 10 poin
  // Level 21-40: 15 poin
  // Level 41-70: 20 poin
  // Level 71-100: 25 poin
  let pointsUp = 5;
  if (level > 70) pointsUp = 25;
  else if (level > 40) pointsUp = 20;
  else if (level > 20) pointsUp = 15;
  else if (level > 10) pointsUp = 10;

  return {
    level,
    pointsNeeded,
    pointsUp,
  };
});
