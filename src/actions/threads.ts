"use server";

import { CreatedThreadSchemaT, ReplyThreadSchemaT } from "../types/thread";
import { db } from "@/db";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { count, eq, sql } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";
import { getSession } from "./session";
import { calculateUserLevel } from "@/utils/helper";
import {
  CommentsTable,
  Topics,
  TUser,
  TThread,
  TComment,
  UsersTable,
  ThreadsTable,
} from "@/db/schema";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rateLimit";

export type ThreadResponse = {
  repliesCount: number;
  user: Pick<TUser, "name" | "image">;
} & Pick<TThread, "id" | "title" | "likes">;

const repliesCount = (threadId: AnyPgColumn) =>
  db
    .select({ count: count() })
    .from(CommentsTable)
    .where(eq(CommentsTable.threadId, threadId));

export const createThreads = async ({
  title,
  content,
  topic,
}: CreatedThreadSchemaT): Promise<{
  message: string;
  status: boolean;
}> => {
  const session = await getSession();
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const isRateLimited = rateLimit(ip);

  if (!session)
    return {
      message: "Loign first...",
      status: false,
    };

  if (isRateLimited)
    return {
      message:
        "You have exceeded the maximum number of requests. Please try again later.",
      status: false,
    };

  const levelInfo = calculateUserLevel(session.user.points ?? 0);

  await db.transaction(async (tx) => {
    await tx.insert(ThreadsTable).values({
      title,
      content,
      topic: topic as (typeof Topics.enumValues)[number],
      userId: session.user.id,
    });

    await tx
      .update(UsersTable)
      .set({
        points: sql`${UsersTable.points} + ${levelInfo.currentLevel.pointsUp}`,
      })
      .where(eq(UsersTable.id, session.user.id));
  });

  return {
    message: "Success create threads",
    status: true,
  };
};

export const createReply = async (
  { content }: ReplyThreadSchemaT,
  id: string
): Promise<{
  message: string;
  status: boolean;
}> => {
  const session = await getSession();
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const isRateLimited = rateLimit(ip);

  if (!session)
    return {
      message: "Login first...",
      status: false,
    };

  if (isRateLimited)
    return {
      message:
        "You have exceeded the maximum number of requests. Please try again later.",
      status: false,
    };

  const levelInfo = calculateUserLevel(session.user.points ?? 0);

  await db.transaction(async (tx) => {
    await tx.insert(CommentsTable).values({
      content,
      userId: session.user.id,
      threadId: id,
    });

    await tx
      .update(UsersTable)
      .set({
        points: sql`${UsersTable.points} + ${levelInfo.currentLevel.pointsUp}`,
      })
      .where(eq(UsersTable.id, session.user.id));
  });

  revalidatePath(`/threads/${id}`);

  return {
    message: "Succes create reply",
    status: true,
  };
};

export const getThreadsByTopic = async (
  topic: string
): Promise<Array<ThreadResponse>> => {
  const threads = await db.query.ThreadsTable.findMany({
    where: (ThreadsTable, { eq }) =>
      eq(ThreadsTable.topic, topic as (typeof Topics.enumValues)[number]),
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
    columns: {
      id: true,
      title: true,
      likes: true,
    },
    extras: ({ id }) => ({
      repliesCount: sql`${repliesCount(id)}`.mapWith(Number).as("repliesCount"),
    }),
  });

  return threads;
};

export const getRecentsThread = async (
  userId: string
): Promise<Array<ThreadResponse>> => {
  const threads = await db.query.ThreadsTable.findMany({
    where: eq(ThreadsTable.userId, userId),
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
    columns: {
      id: true,
      title: true,
      likes: true,
    },
    extras: ({ id }) => ({
      repliesCount: sql`${repliesCount(id)}`.mapWith(Number).as("repliesCount"),
    }),
    orderBy: ({ createdAt }, { asc }) => [asc(createdAt)],
    limit: 5,
  });

  return threads;
};

export const getPopularThreads = async (): Promise<Array<ThreadResponse>> => {
  const threads = await db.query.ThreadsTable.findMany({
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
    columns: {
      id: true,
      title: true,
      likes: true,
    },
    extras: ({ id }) => ({
      repliesCount: sql`${repliesCount(id)}`.mapWith(Number).as("repliesCount"),
    }),
    orderBy: ({ likes }, { desc }) => [desc(likes)],
    limit: 10,
  });

  return threads;
};

export const getDetailThread = async (
  id: string
): Promise<{
  thread:
    | undefined
    | (Pick<TThread, "content" | "createdAt" | "likes" | "title"> & {
        user: Pick<TUser, "name" | "image">;
      });
  replies: Array<
    Pick<TComment, "id" | "content" | "createdAt"> & {
      user: Pick<TUser, "name" | "image">;
    }
  >;
}> => {
  const thread = await db.query.ThreadsTable.findFirst({
    where: (ThreadsTable, { eq }) => eq(ThreadsTable.id, id),
    columns: {
      topic: false,
      id: false,
      userId: false,
    },
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });

  if (!thread)
    return {
      thread: undefined,
      replies: [],
    };

  const replies = await db.query.CommentsTable.findMany({
    where: (CommentsTable, { eq }) => eq(CommentsTable.threadId, id),
    columns: {
      id: true,
      content: true,
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
    orderBy: ({ createdAt }, { asc }) => [asc(createdAt)],
  });

  return {
    thread,
    replies,
  };
};

export const getThreadSearch = async (
  value: string
): Promise<Array<{ id: string; title: string }>> => {
  noStore();

  if (value.length <= 0) return [];

  const threads = await db.query.ThreadsTable.findMany({
    where: ({ title }, { ilike }) => ilike(title, `%${value}%`),
    columns: {
      id: true,
      title: true,
    },
  });

  return threads;
};
