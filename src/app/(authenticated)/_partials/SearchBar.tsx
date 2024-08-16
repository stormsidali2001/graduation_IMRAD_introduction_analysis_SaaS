"use client";

import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();

  const handleSearch = debounce((text: string) => {
    const url = "/introductions/all/1?search=" + encodeURIComponent(text);
    router.push(url);
  }, 1000);
  return (
    <form className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          onReset={() => router.push("/introductions/all/1")}
          onChange={(e) => {
            e.preventDefault();

            handleSearch(e.target.value);
          }}
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </form>
  );
};
