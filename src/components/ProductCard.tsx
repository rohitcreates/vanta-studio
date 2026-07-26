import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="group w-80 flex-shrink 0">
      
      <div className="relative overflow-hidden rounded-xl bg-zinc-100">
     
        <button
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart size={18} className="text-zinc-700" />
        </button>

        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

  
      <div className="mt-3 space-y-1">
        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-1 font-medium text-white transition-colors hover:text-zinc-300">
            {product.name}
          </h2>
        </Link>

        <p className="font-semibold text-zinc-300">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}