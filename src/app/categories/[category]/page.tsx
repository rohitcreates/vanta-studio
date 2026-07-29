import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types/product";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const response = await fetch("http://localhost:3000/api/products");

  const products: Product[] = await response.json();

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold capitalize">
        {category}
      </h1>

      <ProductGrid products={filteredProducts} />
    </main>
  );
}