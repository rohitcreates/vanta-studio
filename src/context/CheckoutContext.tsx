"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { CartItem } from "./CartContext";

type CheckoutSource = "cart" | "buyNow";

interface CheckoutContextType {
  checkoutItems: CartItem[];
  checkoutSource: CheckoutSource | null;

  setCheckoutItems: (items: CartItem[]) => void;
  setCheckoutSource: (source: CheckoutSource) => void;

  clearCheckout: () => void;
}

const CheckoutContext = createContext<
  CheckoutContextType | undefined
>(undefined);

export function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [checkoutSource, setCheckoutSource] =
    useState<CheckoutSource | null>(null);

  const clearCheckout = () => {
    setCheckoutItems([]);
    setCheckoutSource(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutItems,
        checkoutSource,
        setCheckoutItems,
        setCheckoutSource,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      "useCheckout must be used within CheckoutProvider"
    );
  }

  return context;
}