"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/context/AuthContext";

export interface CartItem {
  id: number;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  increaseQuantity: (id: number, size: string, color: string) => void;
  decreaseQuantity: (id: number, size: string, color: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function isCartItemArray(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        Number.isInteger(item.id) &&
        typeof item.size === "string" &&
        typeof item.color === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    )
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadedStorageKey, setLoadedStorageKey] = useState<string | null>(null);

  // A guest cart and every authenticated user's cart live in separate keys.
  // Wait for NextAuth to resolve before choosing a key, otherwise an existing
  // session could briefly be treated as a guest session during hydration.
  const storageKey = authLoading
    ? null
    : user
      ? `cart:user:${user.id}`
      : "cart:guest";

  useEffect(() => {
    if (!storageKey) return;

    let nextCart: CartItem[] = [];

    try {
      const savedCart = localStorage.getItem(storageKey);

      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);
        nextCart = isCartItemArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }

    // This effect intentionally hydrates React state from localStorage after
    // the authenticated user's storage key is known. The targeted suppression
    // avoids disabling the rule for any other state updates in this file.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(nextCart);
    setLoadedStorageKey(storageKey);
  }, [storageKey]);

  useEffect(() => {
    // Prevent the previous account's cart from being written into the newly
    // selected account's key while the new cart is still loading.
    if (!storageKey || loadedStorageKey !== storageKey) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart, loadedStorageKey, storageKey]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const increaseQuantity = (id: number, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number, size: string, color: string) => {
    setCart((prevCart) => {
      const item = prevCart.find(
        (cartItem) =>
          cartItem.id === id &&
          cartItem.size === size &&
          cartItem.color === color
      );

      if (!item) return prevCart;

      if (item.quantity <= 1) {
        return prevCart.filter(
          (cartItem) =>
            !(cartItem.id === id && cartItem.size === size && cartItem.color === color)
        );
      }

      return prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.size === size && cartItem.color === color
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
