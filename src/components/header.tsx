import Link from "next/link";
import { Session } from "@/auth";
import { Button } from "./ui/button";
import SearchPopup from "./search-popup";
import ProfileDropdown from "./profile-dropdown";
import MobileNav from "./mobile-nav";
import { Logo } from "./icon";
import NavbarNavigation from "./navbar-navigation";

type Props = {
  session: Session | null;
};

export default function Header({ session }: Props) {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link
            href="/"
            className="md:text-2xl text-xl font-bold hidden md:flex items-center gap-2"
          >
            <Logo />
            SolvedThis
          </Link>
          <NavbarNavigation />
        </div>
        <div className="flex items-center gap-2">
          <SearchPopup />
          {session ? (
            <ProfileDropdown image={session.user.image} />
          ) : (
            <Button asChild>
              <Link href={"/signin"}>Signin</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
