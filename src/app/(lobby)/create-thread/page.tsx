import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AlertCircle, Lightbulb, MessageSquare } from "lucide-react";
import FormCreate from "./_components/form-create";

export default function CreateThreadPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Thread</h1>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Thread Guidelines</CardTitle>
            <CardDescription>
              Follow these tips for a great discussion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-blue-500" />
                Be respectful and considerate
              </li>
              <li className="flex items-center">
                <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                Provide context and be specific
              </li>
              <li className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                Engage with other member{"'"}s responses
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <FormCreate />
        </Card>
      </div>
    </div>
  );
}
