import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types/product";

export default async function AllProductsPage() {
  const response = await fetch("http://localhost:3000/api/products");

  const products: Product[] = await response.json();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">
        All Products
      </h1>

      <ProductGrid products={products} />
    </main>
  );
}