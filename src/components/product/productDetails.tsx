"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

import ProductInfo from "./productInfo";
import ProductSizes from "./productSizes";
import ProductColors from "./productColors";
import ProductActions from "./productActions";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-8">
      <ProductInfo product={product} />

      <ProductSizes
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <ProductColors
        product={product}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <ProductActions
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </div>
  );
}