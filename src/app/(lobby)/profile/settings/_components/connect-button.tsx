"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema, SetPasswordSchemaT } from "@/types/user";
import { connectAcountToEmailandPassword } from "@/actions/user";

type Props = {
  provider: "google" | "github" | "credential" | "discord";
  connected: boolean;
  disabled: boolean;
};

const ConnectButton = ({ connected, disabled, provider }: Props) => {
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const linkingAccount = async () => {
    if (!connected && provider !== "credential") {
      await authClient.linkSocial({
        provider,
        callbackURL: "/profile/settings",
        fetchOptions: {
          onError: (error) => {
            toast.error(`Failed to link: ${error.error.message}`);
          },
          onRequest: () => {
            setPending(true);
          },
        },
      });
      setPending(false);
      return;
    }

    await authClient.unlinkAccount({
      providerId: provider,
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
        onError: (error) => {
          toast.error(`Failed to unlink: ${error.error.message}`);
        },
        onRequest: () => {
          setPending(true);
        },
      },
    });
    setPending(false);
  };

  return provider === "credential" && !connected ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Connect
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Account</DialogTitle>
          <DialogDescription>
            Link your account to access exclusive features. Share this link only
            with trusted individuals.
          </DialogDescription>
        </DialogHeader>
        <FormSetPassoword
          pending={pending}
          handleSubmit={async (data) => {
            setPending(true);
            const res = await connectAcountToEmailandPassword(data);
            if (!res.status) toast.error(res.message);
            setOpen(false);
            setPending(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || pending}
      onClick={() => linkingAccount()}
    >
      {pending ? <Loader2 className="animate-spin" /> : null}
      {connected ? "Disconnect" : "Connect"}
    </Button>
  );
};

const FormSetPassoword = ({
  pending,
  handleSubmit,
}: {
  pending: boolean;
  handleSubmit: (data: SetPasswordSchemaT) => Promise<void>;
}) => {
  const form = useForm<SetPasswordSchemaT>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        className="flex items-center gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          disabled={pending || form.formState.isSubmitting}
        >
          {pending || form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : null}{" "}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ConnectButton;
