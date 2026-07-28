"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import type { Product } from "@/types/product";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  product: Product;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  selectedSize: string;
  selectedColor: string;
};

export default function ProductActions({
  product,
  quantity,
  setQuantity,
  selectedSize,
  selectedColor,
}: Props) {
  const { addToCart } = useCart();
  const { setCheckoutItems, setCheckoutSource } = useCheckout();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const handleBuyNow = () => {
    setCheckoutItems([
      {
        id: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity,
      },
    ]);

    setCheckoutSource("buyNow");

    router.push("/checkout");
  };

  return (
    <div className="space-y-5 rounded-2xl border border-gray-700 bg-zinc-900 p-6">
      <div className="flex items-center gap-4">
        <label className="rounded-lg border border-gray-500 bg-black px-3 py-2">
          Quantity
        </label>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number(e.target.value)))
          }
          className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-white"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:bg-gray-200"
      >
        Add to Cart
      </button>

      <button
        onClick={handleBuyNow}
        className="w-full rounded-xl border border-white py-4 font-semibold transition hover:bg-white hover:text-black"
      >
        Buy Now
      </button>
    </div>
  );
}