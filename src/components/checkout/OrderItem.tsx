"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { CartItem } from "@/context/CartContext";

interface OrderItemProps {
  item: CartItem;
}

export default function OrderItem({ item }: OrderItemProps) {
  const product = products.find((product) => product.id === item.id);

  if (!product) return null;

  return (
    <div className="flex gap-4 rounded-xl border border-zinc-700 bg-zinc-800 p-4">
      <Image
        src={product.image}
        alt={product.name}
        width={90}
        height={90}
        className="rounded-lg object-cover"
      />

      <div className="flex flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Color: {item.color}
          </p>

          <p className="text-sm text-zinc-400">
            Size: {item.size}
          </p>

          <p className="text-sm text-zinc-400">
            Quantity: {item.quantity}
          </p>
        </div>

        <div className="text-lg font-semibold">
          ${product.price * item.quantity}
        </div>
      </div>
    </div>
  );
}