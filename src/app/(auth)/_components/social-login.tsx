"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";
import { Google, Discord } from "@/components/icon";
import { Github } from "lucide-react";

type Props = {
  pending: boolean;
  setPending: Dispatch<SetStateAction<boolean>>;
};

const LoginGoogle = ({ pending, setPending }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={pending}
      onClick={async () => {
        await authClient.signIn.social(
          {
            provider: "google",
          },
          {
            onRequest: () => {
              setPending(true);
            },
            onSuccess: async () => {
              router.push("/");
              router.refresh();
            },
            onError: (ctx) => {
              toast.error(ctx.error.message ?? "Something went wrong.");
            },
          }
        );
      }}
    >
      <Google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
};

const LoginDiscord = ({ pending, setPending }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={pending}
      onClick={async () => {
        await authClient.signIn.social(
          {
            provider: "discord",
          },
          {
            onRequest: () => {
              setPending(true);
            },
            onSuccess: async () => {
              router.push("/");
              router.refresh();
            },
            onError: (ctx) => {
              toast.error(ctx.error.message ?? "Something went wrong.");
            },
          }
        );
      }}
    >
      <Discord className="mr-2 h-4 w-4" />
      Discord
    </Button>
  );
};

const LoginGithub = ({ pending, setPending }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={pending}
      onClick={async () => {
        await authClient.signIn.social(
          {
            provider: "github",
          },
          {
            onRequest: () => {
              setPending(true);
            },
            onSuccess: async () => {
              router.push("/");
              router.refresh();
            },
            onError: (ctx) => {
              toast.error(ctx.error.message ?? "Something went wrong.");
            },
          }
        );
      }}
    >
      <Github className="mr-2 h-4 w-4" />
      GitHub
    </Button>
  );
};

export { LoginGoogle, LoginDiscord, LoginGithub };
