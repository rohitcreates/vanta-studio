import Image from "next/image";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductGallery({ product }: Props) {
  return (
    <div className="rounded-2xl border border-gray-700 bg-zinc-900 p-4 shadow-sm">
      <div className="relative h-[650px] w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}