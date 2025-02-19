import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen container flex items-center justify-center">
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <section className="relative hidden md:block md:w-1/2">
            <Image
              src="/discussion.jpg"
              alt="People discussing"
              layout="fill"
              objectFit="cover"
            />
          </section>
          {children}
        </div>
      </Card>
    </main>
  );
};

export default Layout;
