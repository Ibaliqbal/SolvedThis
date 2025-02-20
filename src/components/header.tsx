"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { topics } from "@/config/topics";
import { ArrowRight, HandHeart } from "lucide-react";
import { Session } from "@/auth";
import { Button } from "./ui/button";
import SearchPopup from "./search-popup";
import ProfileDropdown from "./profile-dropdown";

type Props = {
  session: Session | null;
};

export default function Header({ session }: Props) {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <HandHeart />
            SolvedThis
          </Link>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <HandHeart className="w-8 h-8" />
                          <div className="my-2 text-lg font-medium">
                            SolvedThis
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            An open-source discussion platform built with
                            Next.js
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="/leaderboard"
                      title="Leaderboard"
                      className="group"
                    >
                      Check out the Leaderboard!
                    </ListItem>
                    <ListItem
                      href="/threads/popular"
                      title="Popular thread"
                      className="group"
                    >
                      Join the hottest conversations! Click here to see
                      what&apos;s trending.
                    </ListItem>
                    <ListItem
                      title={"Explore more"}
                      href={`/topics`}
                      className="group"
                    >
                      Explore for more topics
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:ml-4 transition-all duration-300 ease-linear" />
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {topics.slice(0, 6).map((category) => (
                      <ListItem
                        key={category.name}
                        title={category.name}
                        href={`/topics/${encodeURIComponent(category.name.toLowerCase())}`}
                      >
                        {category.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <SearchPopup />
          {session ? (
            <ProfileDropdown />
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href as string}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            <div className="flex items-center">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
