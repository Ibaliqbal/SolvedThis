"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "nextjs-toploader/app";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

type Props = {
  pending: boolean;
  setPending: Dispatch<SetStateAction<boolean>>;
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

export default LoginGithub;
