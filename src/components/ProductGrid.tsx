import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";


type Props = {
  products: Product[];
};



export default function ProductGrid({ products }: Props) {

  if (products.length === 0) {
  return <p>No products found.</p>;
}
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />

       
      ))}

   
    </div>
  );
} 