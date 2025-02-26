import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, MessageSquare, Shield, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines | SolvedThis",
  description:
    "SolvedThis community guidelines, ensuring a positive experience for all users.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_APP_URL}/guidelines`,
    title: "Community Guidelines | SolvedThis",
    description:
      "SolvedThis community guidelines, ensuring a positive experience for all users.",
  },
};

export default function GuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Community Guidelines</h1>
      <p className="text-lg text-muted-foreground">
        Welcome to SolvedThis! To ensure a positive experience for all users,
        please follow these guidelines:
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Respect and Kindness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Treat others with respect and kindness. No harassment, hate
              speech, or personal attacks are allowed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Quality Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Post thoughtful, relevant content. Avoid spam, excessive
              self-promotion, or off-topic discussions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Inclusive Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Embrace diversity and be inclusive. Discrimination based on race,
              gender, religion, or any other factor is not tolerated.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-primary" />
              Report Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you see content that violates these guidelines, please report
              it to the moderators immediately.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-8">
        Consequences of Violating Guidelines
      </h2>
      <p className="text-muted-foreground">
        Violation of these guidelines may result in content removal, temporary
        suspension, or permanent banning from SolvedThis, depending on the
        severity and frequency of the violation.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Contacting Moderators</h2>
      <p className="text-muted-foreground">
        If you have any questions about these guidelines or need to report a
        violation, please contact our moderation team through the Support page.
      </p>
    </div>
  );
}
