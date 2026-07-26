import type { Product } from "@/types/product";
import ProductSizes from "./productSizes";
import ProductColors from "./productColors";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
          {product.brand}
        </p>

        <h1 className="mt-2 text-5xl font-bold leading-tight">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center gap-2 text-lg">
        <span className="text-yellow-400">⭐</span>
        <span>{product.rating}</span>
      </div>

      <p className="text-4xl font-bold">
        ${product.price}
      </p>

      <ProductSizes product={product} />

      <ProductColors product={product} />
    </div>
  );
}