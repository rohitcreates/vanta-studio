import type { Dispatch, SetStateAction } from "react";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string>>;
};

export default function ProductSizes({
  product,
  selectedSize,
  setSelectedSize,
}: Props) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">
        Select Size
      </h3>

      <div className="flex gap-3">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-all duration-200 ${
              selectedSize === size
                ? "border-white bg-white text-black"
                : "border-gray-500 hover:border-white hover:bg-white hover:text-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}