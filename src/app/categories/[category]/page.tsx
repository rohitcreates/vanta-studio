import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {category}
      </h1>

      <ProductGrid products={filteredProducts} />
    </main>
  );
}