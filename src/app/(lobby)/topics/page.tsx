import { topics } from "@/config/topics";
import TopicCard from "@/components/topic-card";

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics
          .map((topic) => ({
            ...topic,
            threadCount: Math.floor(Math.random() * 150) + 1,
          }))
          .map((topic) => (
            <TopicCard key={topic.name} topic={topic} />
          ))}
      </div>
    </div>
  );
}
