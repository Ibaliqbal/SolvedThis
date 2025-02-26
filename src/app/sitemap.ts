/* eslint-disable @typescript-eslint/no-unused-vars */
import { topics } from "@/config/topics";
import { MetadataRoute } from "next";
import { db } from "@/db";
import { UsersTable, ThreadsTable, CommentsTable } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { safeUrl } from "@/utils/helper";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const getThreads = async () => {
    try {
      return await db.query.ThreadsTable.findMany({
        columns: {
          id: true,
        },
        orderBy: ({ createdAt }, { desc }) => [desc(createdAt)],
        limit: 50000, // Limit's google url
      });
    } catch (error) {
      return [];
    }
  };

  const getUsers = async () => {
    try {
      return await db
        .select({
          id: UsersTable.id,
          name: UsersTable.name,
        })
        .from(UsersTable)
        .leftJoin(ThreadsTable, eq(ThreadsTable.userId, UsersTable.id))
        .leftJoin(CommentsTable, eq(CommentsTable.userId, UsersTable.id))
        .groupBy(UsersTable.id)
        .orderBy(
          desc(
            sql<number>`COUNT(DISTINCT ${ThreadsTable.id}) + COUNT(DISTINCT ${CommentsTable.id})`
          )
        )
        .limit(50000);
    } catch (error) {
      return [];
    }
  };

  const userRoutes = (await getUsers()).map((user) => ({
    url: `${baseUrl}/profile/${encodeURIComponent(user.name)}`,
    lastModified: new Date(),
  }));

  const threadRoutes = (await getThreads()).map((thread) => ({
    url: `${baseUrl}/threads/${thread.id}`,
    lastModified: new Date(),
  }));

  const topicRoutes = topics.map((topic) => ({
    url: safeUrl(`${baseUrl}/topics/${topic.name}`),
    lastModified: new Date(),
  }));

  const routes = [
    "",
    "/guidelines",
    "/support",
    "/faq",
    "/leaderboard",
    "/threads/popular",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...topicRoutes, ...threadRoutes, ...userRoutes];
}
