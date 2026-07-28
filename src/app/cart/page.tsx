"use client";

import { useCart } from "@/context/CartContext";
import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((cartItem) => (
            <CartItemCard
              key={`${cartItem.id}-${cartItem.color}-${cartItem.size}`}
              cartItem={cartItem}
            />
          ))}
        </div>

        {/* Order Summary */}
        <CartSummary />
      </div>
    </main>
  );
}