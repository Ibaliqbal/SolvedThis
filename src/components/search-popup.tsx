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
} from "./ui/command";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";
import { getThreadSearch } from "@/actions/threads";
import { useRouter } from "nextjs-toploader/app";
import { Skeleton } from "./ui/skeleton";

const SearchPopup = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const debounceValue = useDebounce(value, 500);
  const [result, setResult] = React.useState<Array<{
    id: string;
    title: string;
  }> | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Only search when debounced value has content
    if (debounceValue.length <= 0) {
      return;
    }

    async function getSearch() {
      setLoading(true);
      try {
        const res = await getThreadSearch(debounceValue);
        setResult(res);
      } catch (error) {
        console.error("Error searching:", error);
        setResult(null);
        setLoading(false);
      }

      setLoading(false);
    }

    void getSearch();
  }, [debounceValue]); // Add value to dependency array

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
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setValue("");
            setResult(null); // Reset result when dialog closes
          }
        }}
      >
        <CommandInput
          placeholder="Search threads..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandEmpty
            className={loading ? "hidden" : "py-6 text-center text-sm"}
          >
            No results found.
          </CommandEmpty>
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-9 mb-2 mx-2" />
              ))
            : null}
          {result && result.length > 0 && !loading && (
            <CommandGroup heading="Suggestions" className="mb-2">
              {result.map((thread) => (
                <CommandItem
                  key={thread.id}
                  className="h-9 cursor-pointer"
                  onSelect={() => {
                    router.push(`/threads/${thread.id}`);
                    setOpen(false)
                  }}
                >
                  {thread.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchPopup;
