"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema, SignupSchemaT } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormSignUp = () => {
  const form = useForm<SignupSchemaT>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignupSchemaT) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="text-base md:py-5 py-3 focus:outline-none"
                  placeholder="John Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="text-base md:py-5 py-3 focus:outline-none"
                  placeholder="John Doe"
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
            <FormItem className="space-y-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-base md:py-5 py-3 focus:outline-none"
                  placeholder="John Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default FormSignUp;
