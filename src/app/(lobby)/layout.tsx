import { getSession } from "@/actions/session";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  return (
    <main className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-grow">
        <section className="container md:px-7 px-2 py-8">{children}</section>
      </main>
      <Footer />
    </main>
  );
};

export default Layout;
