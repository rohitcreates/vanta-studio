"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { Heart, ShoppingBag } from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) return;

    router.push(
      `/search?q=${encodeURIComponent(trimmedQuery)}`
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Logo */}
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

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Wishlist */}
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

          {/* Cart */}
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

          {/* Authentication */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Admin
                </Link>
              )}

              <Link
                href="/profile"
                className="text-sm font-medium text-white transition hover:text-gray-300"
              >
                {user?.name}
              </Link>

              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}