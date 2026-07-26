import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
   
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Featured
        </h2>

        <p className="mt-2 text-zinc-400">
          Discover our handpicked favorites.
        </p>
      </div>

     
      <div className="overflow-x-auto">
        <div className="flex gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}