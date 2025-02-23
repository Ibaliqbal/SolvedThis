"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";
import { getThreadSearch } from "@/actions/threads";
import Link from "next/link";

const SearchPopup = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const debounceValue = useDebounce(value);
  const [result, setResult] = React.useState<
    Array<{ id: string; title: string }>
  >([]);

  React.useEffect(() => {
    async function getSearch() {
      if (!debounceValue || debounceValue.trim() === "") return;
      const res = await getThreadSearch(debounceValue);

      setResult(res);
    }

    getSearch();
  }, [debounceValue]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        className="text-sm text-muted-foreground flex items-center gap-3"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <Search />
        <span className="md:block hidden">Search something...</span>
        <span className="sr-only">Search thread</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 md:block">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={value}
          onValueChange={(e) => setValue(e)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {result.length > 0 ? (
            <CommandGroup heading="Suggestions" className="mb-2">
              {result.map((thread) => (
                <CommandItem key={thread.id}>
                  <Link href={`/threads/${thread.id}`} prefetch={true}>
                    {thread.title}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchPopup;
