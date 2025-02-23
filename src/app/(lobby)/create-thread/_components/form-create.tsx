"use client";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/text-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CreatedThreadSchemaT, createThreadSchema } from "@/types/thread";
import { topics } from "@/config/topics";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createThreads } from "@/actions/threads";
import toast from "react-hot-toast";

const FormCreate = () => {
  const form = useForm<CreatedThreadSchemaT>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: CreatedThreadSchemaT) => {
    // Here you would typically send the data to your backend
    const res = await createThreads(values);

    if (!res.status) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
    form.setValue("content", "");
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Start a new discussion on any topic you{"'"}re passionate about.
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
            name="topic"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Topic</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? topics.find((topic) => topic.name === field.value)
                              ?.name
                          : "Select topics"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search topic..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No topic found.</CommandEmpty>
                        <CommandGroup>
                          {topics.map((topic) => (
                            <CommandItem
                              value={topic.name}
                              key={topic.name.toLocaleLowerCase()}
                              onSelect={() => {
                                form.setValue("topic", topic.name);
                              }}
                            >
                              {topic.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  topic.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            Create Thread
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default FormCreate;
