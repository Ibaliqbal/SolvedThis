"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Mail, Loader2 } from "lucide-react";

const FormForgot = () => {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const emailForm = form.email.value as string;

    if (!emailForm || emailForm.trim() === "") return;

    setPending(true);
    // Here you would typically call an API to send the reset email\
    const { error } = await authClient.forgetPassword({
      email: emailForm,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(error.message ?? "Failed to reset password");
    } else {
      toast.success(
        "If an account exists for this email, you will receive password reset instructions."
      );
    }
    setPending(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="name@example.com"
          disabled={pending}
        />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Mail className="mr-2 h-4 w-4" />
        )}
        Send Reset Email
      </Button>
    </form>
  );
};

export default FormForgot;
