import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  return (
    <div className="space-y-5 rounded-2xl border border-gray-700 bg-zinc-900 p-6">
      <div>
        <label className="w-24 rounded-lg border border-gray-500 bg-black px-3 py-2">
          Quantity
        </label>

        <input
          type="number"
          min={1}
          defaultValue={1}
          className="w-24 rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <button className="w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:bg-gray-200">
        Add to Cart
      </button>

      <button className="w-full rounded-xl border border-white py-4 font-semibold transition hover:bg-white hover:text-black">
        Buy Now
      </button>
    </div>
  );
}