"use client";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { commentThreadSchema, CommentThreadSchemaT } from "@/types/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const FormComment = () => {
  const form = useForm<CommentThreadSchemaT>({
    resolver: zodResolver(commentThreadSchema),
    defaultValues: { content: "" },
  });

  function handleSubmit(data: CommentThreadSchemaT) {
    console.log(data.content);
  }

  return (
    <Form {...form}>
      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-xl font-bold">Add a comment</FormLabel>
              <FormControl>
                <TextEditor content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Post Comment</Button>
      </form>
    </Form>
  );
};

export default FormComment;
