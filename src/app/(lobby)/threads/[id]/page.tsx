import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Dummy data for a thread and its comments
const thread = {
  id: 1,
  title: "Best programming languages for beginners",
  content:
    "I'm new to programming and wondering which language I should start with. Any suggestions?",
  author: "johndoe",
  createdAt: "2023-04-01T12:00:00Z",
};

const comments = [
  {
    id: 1,
    content: "Python is a great language for beginners!",
    author: "janedoe",
    createdAt: "2023-04-01T13:00:00Z",
  },
  {
    id: 2,
    content:
      "I would recommend JavaScript as it's widely used in web development.",
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{thread.title}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://avatar.vercel.sh/${thread.author}`} />
              <AvatarFallback>{thread.author[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{thread.author}</span>
            <span>•</span>
            <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p>{thread.content}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.author}`}
                  />
                  <AvatarFallback>
                    {comment.author[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{comment.author}</span>
                <span>•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p>{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Add a comment</h3>
        <Textarea placeholder="Type your comment here." className="mb-4" />
        <Button>Post Comment</Button>
      </div>
    </div>
  );
}
