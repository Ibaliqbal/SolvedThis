import { auth } from "@/auth";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { headers } from "next/headers";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-grow">
        <section className="container px-4 py-8">{children}</section>
      </main>
      <Footer />
    </main>
  );
};

export default Layout;
