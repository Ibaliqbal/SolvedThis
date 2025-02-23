"use client";
import { createReply } from "@/actions/threads";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  id: string;
};
const FormComment = ({ id }: Props) => {
  const form = useForm<ReplyThreadSchemaT>({
    resolver: zodResolver(replyThreadSchema),
    defaultValues: { content: "" },
  });
  const [key, setKey] = useState(0);

  async function handleSubmit(data: ReplyThreadSchemaT) {
    const res = await createReply(data, id);

    if (!res.status) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      form.reset({ content: "<p></p>" });
      setKey((prev) => prev + 1);
    }
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
                  key={key}
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          Post Comment
        </Button>
      </form>
    </Form>
  );
};

export default FormComment;
