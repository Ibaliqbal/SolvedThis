import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </main>
  );
};

export default Layout;
