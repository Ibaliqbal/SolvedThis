import FormComment from "../_components/form-comment";
import { ReplyCard } from "../_components/reply-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DOMPurify from "isomorphic-dompurify";
import Share from "../_components/share";
import { dateFormat } from "@/utils/helper";
import Likes from "../_components/likes";
import { domSanitizeConfig } from "@/config/thread";
import { getDetailThread } from "@/actions/threads";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { MessageCircle } from "lucide-react";

const cacheThread = unstable_cache(
  async (id: string) => await getDetailThread(id),
  [`detail-thread`],
  { revalidate: 60 * 60 * 2 }
);

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await cacheThread(params.id);

  if (!data.thread) notFound();

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>{data.thread.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={data.thread.user.image ?? ""} />
                <AvatarFallback>
                  {data.thread.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{data.thread.user.name}</span>
              <span>•</span>
              <span>{dateFormat(data.thread.createdAt)}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  data.thread.content,
                  domSanitizeConfig
                ),
              }}
              className="w-full prose"
            />
          </CardContent>
        </Card>
        <div className="flex items-center gap-3">
          <Likes likes={data.thread.likes} id={params.id} />
          <Share id={params.id} />
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <div className="space-y-4">
        {data.replies.length > 0 ? (
          data.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))
        ) : (
          <div>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Be the first to share your thoughts on this thread!
              </p>
            </CardContent>
          </div>
        )}
      </div>

      <FormComment id={params.id} />
    </section>
  );
}
