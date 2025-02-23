import { db } from "@/db";
import { sql } from "drizzle-orm";
import { ThreadsTable } from "@/db/schema";
import TopicCard from "@/components/topic-card";
import { topics } from "@/config/topics";
import { Skeleton } from "./ui/skeleton";

const PopularTopics = async () => {
  const popularTopicsFromDB = await db
    .select({
      name: ThreadsTable.topic,
      threadCount: sql<number>`count(*)`.as("count"),
    })
    .from(ThreadsTable)
    .groupBy(ThreadsTable.topic)
    .orderBy(sql`count(*) DESC`)
    .limit(4);

  const popularTopics = popularTopicsFromDB.map((dbTopic) => {
    const topicConfig = topics.find((t) => t.name === dbTopic.name);
    return {
      description: topicConfig?.description,
      topic: dbTopic.name,
      threadCount: Number(dbTopic.threadCount),
    };
  });

  return popularTopics.map((topic) => (
    <TopicCard key={topic.topic} topic={topic} />
  ));
};

const PopularSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className="w-full h-[130px]" />
  ));
};

export { PopularTopics, PopularSkeleton };
