import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";

import { categories } from "@/data/categories";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products");

  const products = await response.json();

  return (
    <main>
      <Hero />

      <FeaturedProducts products={products.slice(0, 7)} />

      <CategorySection categories={categories} />
    </main>
  );
}