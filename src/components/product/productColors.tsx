import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductColors({ product }: Props) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Select Color</h3>

      <div className="flex flex-wrap gap-3">
        {product.colors.map((color) => (
         <button
            key={color}
            className="rounded-lg border border-gray-500 px-6 py-3 transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}