"use client";

import type { ReactNode } from "react";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { AuthProvider } from "@/context/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (

    <AuthProvider>
    <CartProvider>
    <WishlistProvider>
      <CheckoutProvider>
      {children}
      </CheckoutProvider>
    </WishlistProvider>
    </CartProvider>
    </AuthProvider>
  );
}