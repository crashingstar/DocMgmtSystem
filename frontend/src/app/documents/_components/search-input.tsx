"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query) {
      router.push(`?search=${query}`);
    }
  };

  const handleClear = () => {
    setQuery(""); // Reset the search input field
    router.push(`${pathname}`); // Optionally redirect to the homepage or clear search results
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex items-center gap-2"
    >
      <div className="relative w-full">
        <Input
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full rounded-lg px-4 py-2 pr-10" // Add padding for the icon
        />
        {query && (
          <div
            onClick={handleClear} // Trigger the clear function
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            aria-label="Clear"
          >
            <X />
          </div>
        )}
      </div>
      <Button type="submit" className=" text-white">
        <Search />
        Search
      </Button>
    </form>
  );
};

export default SearchInput;
