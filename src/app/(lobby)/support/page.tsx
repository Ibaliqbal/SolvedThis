import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle } from "lucide-react";
import { Metadata } from "next";

export const metadat: Metadata = {
  title: "Support | SolvedThis",
  description:
    "Get help with your questions or concerns. Visit our support page for immediate assistance.",
  openGraph: {
    title: "Support | SolvedThis",
    description:
      "Get help with your questions or concerns. Visit our support page for immediate assistance.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/support`,
  },
};

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Support</h1>
      <p className="text-xl text-muted-foreground">
        Need help? You&apos;re in the right place. Check out our FAQs or contact
        us directly.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-primary" />
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                required
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mt-8">Additional Resources</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>
          Check out our{" "}
          <a href="/guidelines" className="text-primary hover:underline">
            Community Guidelines
          </a>{" "}
          for information on expected behavior.
        </li>
        <li>
          Visit our{" "}
          <a href="/faq" className="text-primary hover:underline">
            FAQ page
          </a>{" "}
          for more detailed answers to common questions.
        </li>
        <li>
          For urgent matters, email us directly at{" "}
          <a
            href="mailto:support@solvedthis.com"
            className="text-primary hover:underline"
          >
            support@solvedthis.com
          </a>
          .
        </li>
      </ul>
    </div>
  );
}
