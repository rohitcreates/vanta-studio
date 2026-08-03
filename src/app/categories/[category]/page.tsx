import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const products = await prisma.product.findMany({
    where: {
      category,
    },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    sizes: product.sizes.split(","),
    colors: product.colors.split(","),
  }));

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold capitalize">
        {category}
      </h1>

      <ProductGrid products={formattedProducts} />
    </main>
  );
}