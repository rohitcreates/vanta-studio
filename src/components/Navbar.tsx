"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { Heart, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
       <Link
          href="/"
          className="text-2xl font-extrabold tracking-widest text-white"
        >
          VANTA
        </Link>

        {/* Search */}
        <div className="flex-1">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* Actions */}
      <div className="flex items-center gap-5 text-white">
          <button className="rounded-full p-2 text-gray-400 transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white">
            <Heart />
          </button>

          <button className="rounded-full p-2 text-gray-400 transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white">
            <ShoppingBag />
          </button>

          <button className="rounded-full p-2 text-gray-400 transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white"  >
            <User />
          </button>
        </div>
      </div>
    </nav>
  );
}