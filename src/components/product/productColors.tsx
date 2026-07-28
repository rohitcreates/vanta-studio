import type { Dispatch, SetStateAction } from "react";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

export default function ProductColors({
  product,
  selectedColor,
  setSelectedColor,
}: Props) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">
        Select Color
      </h3>

      <div className="flex flex-wrap gap-3">
        {product.colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`rounded-lg border px-6 py-3 transition-all duration-200 ${
              selectedColor === color
                ? "border-white bg-white text-black"
                : "border-gray-500 hover:border-white hover:bg-white hover:text-black"
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}