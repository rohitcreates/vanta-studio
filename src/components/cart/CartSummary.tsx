"use client";

import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";

export default function CartSummary() {
  const { cart } = useCart();
  const { setCheckoutItems, setCheckoutSource } = useCheckout();
  const router = useRouter();

  const subtotal = cart.reduce((total, cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.id
    );

    if (!product) return total;

    return total + product.price * cartItem.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 20 : 0;

  const total = subtotal + shipping;

  const handleCheckout = () => {
    setCheckoutItems(cart);
    setCheckoutSource("cart");
    router.push("/checkout");
  };

  return (
    <div className="h-fit rounded-xl border border-gray-200 bg-black p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full rounded-lg bg-white py-3 text-black transition hover:bg-gray-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}