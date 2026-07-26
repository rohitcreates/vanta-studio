import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type Props = {
  products: Product[];
};

export default function TrendingProducts({ products }: Props) {
  return (
    <section>
      <h2>
        Trending Now
      </h2>

      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}