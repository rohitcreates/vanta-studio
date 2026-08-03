import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";

import { categories } from "@/data/categories";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany();

  const formattedProducts = products.map((product) => ({
    ...product,
    sizes: product.sizes.split(","),
    colors: product.colors.split(","),
  }));

  return (
    <main>
      <Hero />

      <FeaturedProducts products={formattedProducts.slice(0, 7)} />

      <CategorySection categories={categories} />
    </main>
  );
}