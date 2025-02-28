import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type Props = {
  image: string | null | undefined;
};

const ProfileDropdown = ({ image }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7 cursor-pointer">
          <AvatarImage src={image ?? ""} />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-2">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={"/profile/settings"}>
              <User />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/logout">
              <LogOut />
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
