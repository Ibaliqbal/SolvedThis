import ThreadCard from "@/components/thread-card";
import { getThreadsByTopic } from "@/actions/threads";
import { CardContent } from "@/components/ui/card";
import { MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { topics } from "@/config/topics";

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const slug = decodeURIComponent(params.slug);
  const findTopic = topics.find((topic) => topic.name === slug);
  return {
    title: `Discussions in ${slug} | SolvedThis`,
    description: findTopic?.description,
    openGraph: {
      title: `Discussions in ${slug} | SolvedThis`,
      description: findTopic?.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`,
    },
  };
};

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);

  const threads = await getThreadsByTopic(slug);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">{slug} Discussions</h1>
      <div className="flex flex-col gap-4">
        {threads.length > 0 ? (
          threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))
        ) : (
          <div>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No threads yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Be the first to start a discussion in this topic!
              </p>
              <Button asChild>
                <Link href={"/create-thread"}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Thread
                </Link>
              </Button>
            </CardContent>
          </div>
        )}
      </div>
    </div>
  );
}
