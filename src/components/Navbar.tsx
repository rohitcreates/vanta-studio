"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { Heart, ShoppingBag, User } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

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

        
        <div className="flex-1">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
        </div>

      
      <div className="flex items-center gap-5 text-white">
          <Link
            href="/wishlist"
            className="relative rounded-full p-2 text-gray-400 transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white"
          >
            <Heart />

            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full p-2 text-gray-400 transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white"
          >
            <ShoppingBag />

            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className="rounded-full p-2 text-gray-400 transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white"
          >
            <User />
          </Link>
        </div>
      </div>
    </nav>
  );
}