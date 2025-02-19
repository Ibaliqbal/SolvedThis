"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TextEditor from "@/components/text-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { limitContent } from "@/config/thread";
import { AlertCircle, Lightbulb, MessageSquare } from "lucide-react";

const categories = [
  { slug: "technology", name: "Technology" },
  { slug: "gaming", name: "Gaming" },
  { slug: "movies", name: "Movies" },
  { slug: "books", name: "Books" },
];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  category: z.string().min(1, "Please select a category"),
  content: z
    .string()
    .max(limitContent, "Content must be at least 20 characters long"),
});

export default function CreateThreadPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically send the data to your backend
    console.log({ values });
    // Redirect to the home page after submission
    // router.push("/");
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Share Your Thoughts</CardTitle>
                <CardDescription>
                  Start a new discussion on any topic you{"'"}re passionate
                  about.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a catchy title for your thread"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.slug} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <TextEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Create Thread</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
