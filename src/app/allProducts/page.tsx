import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

export default async function AllProductsPage() {
  const products = await prisma.product.findMany();

  const formattedProducts = products.map((product) => ({
    ...product,
    sizes: product.sizes.split(","),
    colors: product.colors.split(","),
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">
        All Products
      </h1>

      <ProductGrid products={formattedProducts} />
    </main>
  );
}