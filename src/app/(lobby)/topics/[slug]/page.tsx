import ThreadCard from "@/components/thread-card";

// Dummy data for threads
const threads = [
  {
    id: 1,
    title: "Best programming languages for beginners",
    author: "johndoe",
    replies: 15,
    views: 100,
  },
  {
    id: 2,
    title: "How to optimize your website for speed",
    author: "janedoe",
    replies: 8,
    views: 75,
  },
  {
    id: 3,
    title: "The future of artificial intelligence",
    author: "bobsmith",
    replies: 20,
    views: 150,
  },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">{slug} Discussions</h1>
      <div className="flex flex-col gap-4">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
