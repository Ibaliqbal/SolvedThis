import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, TrendingUp, Users } from "lucide-react";

const topics = [
  {
    slug: "technology",
    name: "Technology",
    description: "Discuss the latest in tech",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    slug: "gaming",
    name: "Gaming",
    description: "Share your gaming experiences",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    slug: "movies",
    name: "Movies",
    description: "Talk about your favorite films",
    icon: <Users className="h-6 w-6" />,
  },
  {
    slug: "books",
    name: "Books",
    description: "Explore the world of literature",
    icon: <MessageSquare className="h-6 w-6" />,
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 px-4">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up duration-700"
          style={{
            animationFillMode: "both",
          }}
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100">
            SolvedThis
          </span>
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-up delay-200 duration-700"
          style={{
            animationFillMode: "both",
          }}
        >
          An open-source discussion platform for sharing ideas, asking
          questions, and connecting with others.
        </p>
        <div
          className="flex justify-center gap-4 animate-fade-up delay-300 duration-700"
          style={{
            animationFillMode: "both",
          }}
        >
          <Button size="lg" asChild>
            <Link href="/create-thread">Start a Discussion</Link>
          </Button>
          <Button size="lg" variant="outline">
            Explore Topics
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Popular Topics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`}>
              <Card className="hover:bg-muted/50 transition-colors h-full">
                <CardHeader>
                  <div className="mb-2">{topic.icon}</div>
                  <CardTitle className="flex items-center justify-between">
                    {topic.name}
                    <ArrowRight className="h-4 w-4" />
                  </CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Why Choose SolvedThis?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
              <CardDescription>
                Our platform is fully open source, allowing for transparency and
                community contributions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rich Discussions</CardTitle>
              <CardDescription>
                Engage in meaningful conversations with our feature-rich
                discussion tools.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community Driven</CardTitle>
              <CardDescription>
                Join a vibrant community of thinkers, creators, and problem
                solvers.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
