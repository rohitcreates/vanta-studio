import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types/product";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  const response = await fetch("http://localhost:3000/api/products");

  const products: Product[] = await response.json();

  const search = q.toLowerCase();

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  return <ProductGrid products={filteredProducts} />;
}