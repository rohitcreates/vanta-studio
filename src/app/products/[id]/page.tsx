import type { Product } from "@/types/product";
import ProductGallery from "@/components/product/productGallery";
import ProductDetails from "@/components/product/productDetails";
import ProductDescription from "@/components/product/productDescription";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/products/${id}`
  );

  const product = await response.json();

  if (!product) {
    return <h1>Product not found.</h1>;
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />
        <ProductDetails product={product} />
      </div>

      <div className="mt-16">
        <ProductDescription product={product} />
      </div>
    </main>
  );
}