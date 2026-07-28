"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
}

export const WishlistContext =
  createContext<WishlistContextType | null>(null);

interface WishlistProviderProps {
  children: React.ReactNode;
}

export function WishlistProvider({
  children,
}: WishlistProviderProps) {

  const [wishlist, setWishlist] = useState<number[]>([]);


  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

 
  useEffect(() => {
    try {
      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlist]);

  const toggleWishlist = (id: number) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(id)) {
        return prevWishlist.filter((item) => item !== id);
      }

      return [...prevWishlist, id];
    });
  };

  const isWishlisted = (id: number) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}