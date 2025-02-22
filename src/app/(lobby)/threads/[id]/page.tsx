import FormComment from "../_components/form-comment";
import ReplyCard from "../_components/reply-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DOMPurify from "isomorphic-dompurify";
import Share from "../_components/share";
import { dateFormat } from "@/utils/helper";
import Likes from "../_components/likes";

// Dummy data for a thread and its comments
const thread = {
  id: 1,
  title: "Best programming languages for beginners",
  content: `<p>I'm new to programming and wondering which language I should start with. Any suggestions? Here are some options I've heard about:</p>
    <ul>
      <li>Python</li>
      <li>JavaScript</li>
      <li>Java</li>
      <li>C++</li>
    </ul>
  <p>What do you think would be best for a complete beginner?</p>`,
  author: "johndoe",
  createdAt: "2023-04-01T12:00:00Z",
};

const comments = [
  {
    id: 1,
    content: `<p>Python is a great language for beginners!</p>`,
    author: "janedoe",
    createdAt: "2023-04-01T13:00:00Z",
  },
  {
    id: 2,
    content: `<p>I would recommend JavaScript as it's widely used in web development.</p>`,
    author: "bobsmith",
    createdAt: "2023-04-01T14:30:00Z",
  },
];

// {
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

export default function ThreadPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>{thread.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${thread.author}`}
                />
                <AvatarFallback>
                  {thread.author[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{thread.author}</span>
              <span>•</span>
              <span>{dateFormat(thread.createdAt)}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(thread.content),
              }}
            />
          </CardContent>
        </Card>
        <div className="flex items-center gap-3">
          <Likes />
          <Share />
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <ReplyCard key={comment.id} reply={comment} />
        ))}
      </div>

      <FormComment />
    </section>
  );
}
