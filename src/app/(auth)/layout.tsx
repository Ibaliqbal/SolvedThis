import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen md:px-7 px-2 flex items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
