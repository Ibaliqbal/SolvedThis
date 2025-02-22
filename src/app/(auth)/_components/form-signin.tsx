"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signinSchema, SigninSchemaT } from "@/types/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";

const FormSignin = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const form = useForm<SigninSchemaT>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: SigninSchemaT) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          form.reset();
          router.refresh();
        },
        onError: (ctx) => {
          console.log(ctx.error);
          toast.error(ctx.error.message ?? "Internal server error");
          form.reset();
        },
      }
    );
    setPending(false);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="text-base md:py-5 py-3 focus:outline-none"
                  placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-base md:py-5 py-3 focus:outline-none"
                  type="password"
                  placeholder="*********"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting || pending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Sign In with Email
        </Button>
      </form>
    </Form>
  );
};

export default FormSignin;
