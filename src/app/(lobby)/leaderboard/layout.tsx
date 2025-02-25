import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Top contributors in our community
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Top Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">{children}</CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground">
          Keep contributing to climb the ranks! Check out our{" "}
          <a href="/guidelines" className="text-primary hover:underline">
            community guidelines
          </a>{" "}
          to learn how to level up.
        </p>
      </div>
    </div>
  );
};

export default Layout;
