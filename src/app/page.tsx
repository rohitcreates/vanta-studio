import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";

import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function Home() {
  return (
    <main>
      <Hero />

      <FeaturedProducts products={products.slice(0,7)} />

      <CategorySection categories={categories} />
    </main>
  );
}