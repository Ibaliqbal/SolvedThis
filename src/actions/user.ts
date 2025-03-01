"use server";
import { headers } from "next/headers";
import { count, eq, sql } from "drizzle-orm";
import { getSession } from "./session";
import { db } from "@/db";
import { CommentsTable, ThreadsTable, UsersTable } from "@/db/schema";
import { AnyPgColumn } from "drizzle-orm/pg-core";
import { calculateUserLevel } from "@/utils/helper";
import { utApi } from "@/lib/uploadthing";
import { revalidatePath } from "next/cache";
import { UploadFileResult } from "uploadthing/types";
import { rateLimit } from "@/lib/rateLimit";
import { auth } from "@/auth";
import { setPasswordSchema } from "@/types/user";

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
      bio: true,
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

export const getUserProfile = async (name: string) => {
  const userData = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.name, name),
    columns: {
      id: true,
      image: true,
      email: true,
      name: true,
      points: true,
      createdAt: true,
      bio: true,
    },
    extras: ({ id }) => ({
      repliesCount: sql`${repliesCount(id)}`.mapWith(Number).as("repliesCount"),
      threadsCount: sql`${threadsCount(id)}`.mapWith(Number).as("threadsCount"),
    }),
  });

  return userData;
};

export const updateProfile = async (form: FormData) => {
  const session = await getSession();

  if (!session)
    return {
      message: "Login first...",
      status: false,
    };

  const avatar = form.get("file");
  const name = form.get("name") as string;
  const bio = form.get("bio") as string;

  let responseUploadthing: UploadFileResult | undefined;

  if (avatar && avatar instanceof File) {
    if (!avatar.type.startsWith("image/")) {
      return {
        message: "Please upload an image file",
        status: false,
      };
    }

    if (avatar.size > 2 * 1024 * 1024) {
      return {
        message: "Image size should be less than 2MB",
        status: false,
      };
    }

    responseUploadthing = await utApi.uploadFiles(avatar as File);
  }

  await db
    .update(UsersTable)
    .set({
      name,
      image: responseUploadthing?.data?.url ?? session.user.image,
      bio,
    })
    .where(eq(UsersTable.id, session.user.id));

  revalidatePath("/profile/settings");

  return {
    message: "Success",
    status: true,
  };
};

export const likeToggleThreads = async (isLikeIt: boolean, id: string) => {
  const session = await getSession();
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const isRateLimited = rateLimit(ip);

  if (!session)
    return {
      status: false,
      message: "Login first...",
    };

  if (isRateLimited)
    return {
      message:
        "You have exceeded the maximum number of requests. Please try again later.",
      status: false,
    };

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(ThreadsTable)
        .set({
          likes: isLikeIt
            ? sql`${ThreadsTable.likes} - ${Number("1")}`
            : sql`${ThreadsTable.likes} + ${Number("1")}`,
        })
        .where(eq(ThreadsTable.id, id));

      await tx
        .update(UsersTable)
        .set({
          likesThread: isLikeIt
            ? (session.user.likesThread ?? []).filter((thread) => thread !== id)
            : [...(session.user.likesThread ?? []), id],
          updatedAt: sql`NOW()`,
        })
        .where(eq(UsersTable.id, session.user.id));
    });

    return {
      message: "Success like",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to like",
      status: false,
    };
  }
};

export const getInfoAccountConnected = async () => {
  const session = await getSession();

  if (!session) return undefined;

  const accounts = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.id, session.user.id),
    columns: {
      id: true,
    },
    with: {
      accounts: {
        columns: {
          providerId: true,
        },
      },
    },
  });

  return accounts;
};

export const connectAcountToEmailandPassword = async (form: {
  password: string;
}) => {
  const session = await getSession();
  if (!session)
    return {
      message: "Access denied",
      status: false,
    };

  const { data, error } = setPasswordSchema.safeParse(form);

  if (error)
    return {
      message: error.message,
      status: false,
    };

  const res = await auth.api.setPassword({
    headers: await headers(),
    body: { newPassword: data.password },
  });

  if (!res.status)
    return {
      message: "Something went wrong...",
      status: res.status,
    };

  return {
    message: "Success",
    status: res.status,
  };
};
