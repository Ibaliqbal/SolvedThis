import { Discord, Google } from "@/components/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import ConnectButton from "./connect-button";
import { Skeleton } from "@/components/ui/skeleton";
import { getInfoAccountConnected } from "@/actions/user";

async function ConnectedAccounts() {
  const accounts = await getInfoAccountConnected();

  const accountsList = [
    { name: "Email & Password", icon: Mail, provider: "credential" },
    { name: "GitHub", icon: Github, provider: "github" },
    { name: "Google", icon: Google, provider: "google" },
    { name: "Discord", icon: Discord, provider: "discord" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Manage your connected social media accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {accountsList.map((account) => (
          <div
            className="flex items-center justify-between"
            key={account.provider}
          >
            <div className="flex items-center space-x-4">
              <account.icon className="h-5 w-5" />
              <span className="font-semibold text-sm">{account.name}</span>
            </div>
            <ConnectButton
              provider={
                account.provider as
                  | "google"
                  | "github"
                  | "credential"
                  | "discord"
              }
              connected={
                accounts?.accounts.some(
                  (acc) => acc.providerId === account.provider
                ) ?? false
              }
              disabled={
                (accounts?.accounts.length ?? 0) <= 1 &&
                (accounts?.accounts.some(
                  (acc) => acc.providerId === account.provider
                ) ??
                  false)
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const ConnectedAccountsLoading = () => {
  return <Skeleton className="w-full h-[200px]" />;
};

export { ConnectedAccountsLoading, ConnectedAccounts };
