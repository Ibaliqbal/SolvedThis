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
import { replyThreadSchema, ReplyThreadSchemaT } from "@/types/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const FormComment = () => {
  const form = useForm<ReplyThreadSchemaT>({
    resolver: zodResolver(replyThreadSchema),
    defaultValues: { content: "" },
  });

  function handleSubmit(data: ReplyThreadSchemaT) {
    console.log(data.content);
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-xl font-bold">Add a comment</FormLabel>
              <FormControl>
                <TextEditor
                  content={field.value}
                  onChange={(content) => {
                    // Menghapus semua whitespace dan line breaks
                    const cleanContent = content.replace(/\s/g, "");
                    // Mengecek apakah content hanya berisi kombinasi dari <p></p> atau <p><br></p>
                    const isEmptyContent = /^(<p><\/p>|<p><br><\/p>)*$/.test(
                      cleanContent
                    );

                    if (isEmptyContent) {
                      field.onChange("");
                    } else {
                      field.onChange(content);
                    }
                  }}
                />
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
