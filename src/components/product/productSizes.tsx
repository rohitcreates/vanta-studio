import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductSizes({ product }: Props) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Select Size</h3>

      <div >
        {product.sizes.map((size) => (
        <button
        key={size}
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-500 transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
      >
        {size}
      </button>
        ))}
      </div>
    </div>
  );
}