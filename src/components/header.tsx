import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
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
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold">
            SolvedThis
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {topics.slice(0, 5).map((category) => (
                      <ListItem
                        key={category.name}
                        title={category.name}
                        href={`/topics/${category.name.toLowerCase()}`}
                      >
                        {category.description}
                      </ListItem>
                    ))}
                    <ListItem
                      title={"Explore more"}
                      href={`/topics`}
                      className="group"
                    >
                      Explore for more topics{" "}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:ml-4 transition-all duration-300 ease-linear" />
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <ThemeToggle />
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
