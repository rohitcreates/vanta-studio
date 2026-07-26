import { products } from "@/data/products";
import ProductGallery from "@/components/product/productGallery";
import ProductInfo from "@/components/product/productInfo";
import ProductActions from "@/components/product/productActions";
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

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return <h1>Product not found.</h1>;
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="space-y-8">
          <ProductInfo product={product} />
          <ProductActions product={product} />
        </div>
      </div>

      <div className="mt-16">
        <ProductDescription product={product} />
      </div>
    </main>
  );
}