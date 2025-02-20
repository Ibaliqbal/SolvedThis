import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill in the required information and follow the prompts to complete your registration.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "If you've forgotten your password, click on the 'Forgot Password' link on the sign-in page. Enter your email address, and we'll send you instructions to reset your password.",
  },
  {
    question: "How do I report inappropriate content?",
    answer:
      "If you come across any content that violates our community guidelines, please use the 'Report' button next to the post or comment. Our moderation team will review the report and take appropriate action.",
  },
  {
    question: "Can I change my username?",
    answer:
      "Yes, you can change your username once every 30 days. Go to your account settings and look for the 'Change Username' option. Keep in mind that your old username will be available for others to use after you change it.",
  },
  {
    question: "How do I create a new thread?",
    answer:
      "To create a new thread, navigate to the desired topic or category, then click on the 'New Thread' or 'Create Thread' button. Fill in the title and content of your thread, select any relevant tags, and submit.",
  },
  {
    question: "Are there any posting limits?",
    answer:
      "New users may have some initial posting limits to prevent spam. These limits are usually lifted after you've been an active member for a short period. If you need these limits adjusted, please contact our support team.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find answers to common questions about using ForumApp
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search FAQs..." type="search" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <HelpCircle className="mr-2 h-6 w-6 text-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground">
          Can&apos;t find what you&apos;re looking for? Visit our{" "}
          <a href="/support" className="text-primary hover:underline">
            Support page
          </a>{" "}
          for more help.
        </p>
      </div>
    </div>
  );
}
