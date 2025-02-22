"use client";

import { Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordSchemaT } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type Props = {
  token: string;
};

const FormReset = ({ token }: Props) => {
  const form = useForm<ResetPasswordSchemaT>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const handleSubmit = async (values: ResetPasswordSchemaT) => {
    // Here you would typically call an API to reset the password
    const { error } = await authClient.resetPassword({
      token,
      newPassword: values.newPassword,
    });

    if (error) {
      toast.error(error.message ?? "Something went wrong");
    } else {
      toast.success(
        "Your password has been reset. You can now sign in with your new password."
      );
      router.push("/signin");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lock className="mr-2 h-4 w-4" />
          )}
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default FormReset;
