import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen container flex items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
