"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  id: number;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (
    id: number,
    size: string,
    color: string
  ) => void;

  increaseQuantity: (
    id: number,
    size: string,
    color: string
  ) => void;

  decreaseQuantity: (
    id: number,
    size: string,
    color: string
  ) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

 
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.some(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (itemExists) {
        return prevCart.map((cartItem) => {
          if (
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
          ) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            };
          }

          return cartItem;
        });
      }

      return [...prevCart, item];
    });
  };

  const removeFromCart = (
    id: number,
    size: string,
    color: string
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.id === id &&
            cartItem.size === size &&
            cartItem.color === color
          )
      )
    );
  };

  const increaseQuantity = (
    id: number,
    size: string,
    color: string
  ) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => {
        if (
          cartItem.id === id &&
          cartItem.size === size &&
          cartItem.color === color
        ) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }

        return cartItem;
      })
    );
  };

  const decreaseQuantity = (
    id: number,
    size: string,
    color: string
  ) => {
    const item = cart.find(
      (cartItem) =>
        cartItem.id === id &&
        cartItem.size === size &&
        cartItem.color === color
    );

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(id, size, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((cartItem) => {
        if (
          cartItem.id === id &&
          cartItem.size === size &&
          cartItem.color === color
        ) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        }

        return cartItem;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

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