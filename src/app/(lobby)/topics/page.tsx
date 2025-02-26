import { topics } from "@/config/topics";
import TopicCard from "@/components/topic-card";
import { db } from "@/db";
import { Topics } from "@/db/schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Topics | SolvedThis",
  description:
    "Join our community to explore and discuss trending topics that matter to you. Discover insights, share ideas, and connect with others!",
  openGraph: {
    title: "Explore Topics | SolvedThis",
    description:
      "Join our community to explore and discuss trending topics that matter to you. Discover insights, share ideas, and connect with others!",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/topics`,
  },
};

export default async function TopicsPage() {
  const thread = await db.query.ThreadsTable.findMany({
    columns: {
      topic: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics
          .map((topic) => ({
            topic: topic.name as (typeof Topics.enumValues)[number],
            description: topic.description,
            threadCount: thread.filter((thread) => thread.topic === topic.name)
              .length,
          }))
          .map((topic) => (
            <TopicCard key={topic.topic} topic={topic} />
          ))}
      </div>
    </div>
  );
}
