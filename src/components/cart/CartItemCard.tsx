"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { CartItem, useCart } from "@/context/CartContext";

interface CartItemCardProps {
  cartItem: CartItem;
}

export default function CartItemCard({
  cartItem,
}: CartItemCardProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const product = products.find(
    (product) => product.id === cartItem.id
  );

  if (!product) return null;

  return (
    <div className="flex gap-6 rounded-xl border border-zinc-700 bg-zinc-900 p-5 shadow-sm">
    
      <div className="relative h-32 w-32 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

    
      <div className="flex flex-1 justify-between">
       
        <div>
          <p className="text-sm text-gray-400">
            {product.brand}
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            {product.name}
          </h2>

          <p className="mt-3 text-sm">
            Color:{" "}
            <span className="font-medium">
              {cartItem.color}
            </span>
          </p>

          <p className="text-sm">
            Size:{" "}
            <span className="font-medium">
              {cartItem.size}
            </span>
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() =>
                decreaseQuantity(
                  cartItem.id,
                  cartItem.size,
                  cartItem.color
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border transition hover:bg-gray-100"
            >
              -
            </button>

            <span className="font-medium">
              {cartItem.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  cartItem.id,
                  cartItem.size,
                  cartItem.color
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border transition hover:bg-gray-100"
            >
              +
            </button>
          </div>

        
          <button
            onClick={() =>
              removeFromCart(
                cartItem.id,
                cartItem.size,
                cartItem.color
              )
            }
            className="mt-4 text-sm font-medium text-red-500 transition hover:text-red-600"
          >
            Remove
          </button>
        </div>

        
        <div className="text-right">
          <p className="text-2xl font-bold">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}