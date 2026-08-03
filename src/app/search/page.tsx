import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  const products = await prisma.product.findMany();

  const formattedProducts = products.map((product) => ({
    ...product,
    sizes: product.sizes.split(","),
    colors: product.colors.split(","),
  }));

  const search = q.toLowerCase();

  const filteredProducts = formattedProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  return <ProductGrid products={filteredProducts} />;
}