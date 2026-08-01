"use client";
import type { CartItem } from "@/context/CartContext";
import { products } from "@/data/products";
import OrderItem from "./OrderItem";

interface CheckoutSummaryProps {
  checkoutItems: CartItem[];
  onPlaceOrder: () => void;
  loading: boolean;
}

export default function CheckoutSummary({
  checkoutItems,
  onPlaceOrder,
  loading,
}: CheckoutSummaryProps) {

  const subtotal = checkoutItems.reduce((total, item) => {
    const product = products.find(
      (product) => product.id === item.id
    );

    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : subtotal > 0 ? 20 : 0;

  const total = subtotal + shipping;

  return (
    <div className="h-fit rounded-xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">
        {checkoutItems.map((item) => (
          <OrderItem
            key={`${item.id}-${item.color}-${item.size}`}
            item={item}
          />
        ))}

        <hr className="border-zinc-700" />

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <hr className="border-zinc-700" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-white py-3 text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}