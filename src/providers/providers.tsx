"use client";

import type { ReactNode } from "react";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (

    <CartProvider>
    <WishlistProvider>
      <CheckoutProvider>
      {children}
      </CheckoutProvider>
    </WishlistProvider>
    </CartProvider>
  );
}