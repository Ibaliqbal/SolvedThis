"use server";
import { count, eq, sql } from "drizzle-orm";
import { getSession } from "./session";
import { db } from "@/db";
import { CommentsTable, ThreadsTable, UsersTable } from "@/db/schema";
import { AnyPgColumn } from "drizzle-orm/pg-core";

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
