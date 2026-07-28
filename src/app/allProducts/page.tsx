"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured");

  const sortedProducts = [...products];

  switch (sortBy) {
    case "low-high":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high-low":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between ">
        <h1 className="text-3xl font-bold">
          All Products
        </h1>

        <select
        className="bg-black"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <ProductGrid products={sortedProducts} />
    </main>
  );
}