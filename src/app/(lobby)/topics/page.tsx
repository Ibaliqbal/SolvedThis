import { topics } from "@/config/topics";
import TopicCard from "@/components/topic-card";
import { db } from "@/db";

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
            ...topic,
            threadCount: thread.filter((thread) => thread.topic === topic.name)
              .length,
          }))
          .map((topic) => (
            <TopicCard key={topic.name} topic={topic} />
          ))}
      </div>
    </div>
  );
}
