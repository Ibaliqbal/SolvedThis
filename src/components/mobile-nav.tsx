"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { topics } from "@/config/topics";
import { Logo } from "./icon";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="link">
          <Menu />
          <span className="sr-only">Hamburger</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pt-10">
        <Link
          href={"/"}
          className="text-xl font-semibold flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Logo />
          SolvedThis
        </Link>
        <ScrollArea className="pb-10 h-[calc(100dvh - 9rem)] my-6">
          <section className="pr-3">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="home">
                <AccordionTrigger>Home</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <Link href="/leaderboard" onClick={() => setOpen(false)}>
                      Leaderboard
                    </Link>
                    <Link
                      href="/threads/popular"
                      onClick={() => setOpen(false)}
                    >
                      Popular Threads
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="topics">
                <AccordionTrigger>Topics</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    {topics.slice(0, 6).map((topic) => (
                      <Link
                        href={`/topics/${encodeURIComponent(topic.name)}`}
                        onClick={() => setOpen(false)}
                        key={topic.name.toLocaleLowerCase()}
                      >
                        {topic.name}
                      </Link>
                    ))}
                    <Link href="/topics" onClick={() => setOpen(false)}>
                      Explore more topics
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
