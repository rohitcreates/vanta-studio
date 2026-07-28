import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
        {product.brand}
      </p>

      <h1 className="mt-2 text-5xl font-bold leading-tight">
        {product.name}
      </h1>

      <div className="mt-6 flex items-center gap-2 text-lg">
        <span className="text-yellow-400">⭐</span>
        <span>{product.rating}</span>
      </div>

      <p className="mt-6 text-4xl font-bold">
        ${product.price}
      </p>
    </div>
  );
}