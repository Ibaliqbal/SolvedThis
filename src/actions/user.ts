"use server";
import { count, eq, sql } from "drizzle-orm";
import { getSession } from "./session";
import { db } from "@/db";
import { CommentsTable, ThreadsTable, UsersTable } from "@/db/schema";
import { AnyPgColumn } from "drizzle-orm/pg-core";
import { calculateUserLevel } from "@/utils/helper";

const threadsCount = (userId: AnyPgColumn) =>
  db
    .select({ count: count() })
    .from(ThreadsTable)
    .where(eq(ThreadsTable.userId, userId));

const repliesCount = (userId: AnyPgColumn) =>
  db
    .select({ count: count() })
    .from(CommentsTable)
    .where(eq(CommentsTable.userId, userId));

export const getProfile = async () => {
  const session = await getSession();

  if (!session) return undefined;

  const userData = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.id, session.user.id),
    columns: {
      image: true,
      email: true,
      name: true,
      points: true,
      createdAt: true,
    },
    extras: ({ id }) => ({
      repliesCount: sql`${repliesCount(id)}`.mapWith(Number).as("repliesCount"),
      threadsCount: sql`${threadsCount(id)}`.mapWith(Number).as("threadsCount"),
    }),
  });

  return userData;
};

export const getLeaderboard = async () => {
  const data = await db.query.UsersTable.findMany({
    columns: {
      id: true,
      name: true,
      image: true,
      points: true,
    },
    extras: ({ id }) => ({
      repliesCount: sql`${repliesCount(id)}`.mapWith(Number).as("repliesCount"),
      threadsCount: sql`${threadsCount(id)}`.mapWith(Number).as("threadsCount"),
    }),
    orderBy: ({ points }, { desc }) => [desc(points)],
    limit: 50,
  });

  const leaderboard = data.map((user) => {
    const levelInfo = calculateUserLevel(user.points);
    const totalPosts = Number(user.repliesCount) + Number(user.threadsCount);

    return {
      id: user.id,
      name: user.name,
      image: user.image,
      level: levelInfo.currentLevel.level,
      totalPosts,
    };
  });

  return leaderboard;
};
