import { prisma } from "@/lib/prisma";
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

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return <h1>Product not found.</h1>;
  }

  const formattedProduct = {
    ...product,
    sizes: product.sizes.split(","),
    colors: product.colors.split(","),
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={formattedProduct} />
        <ProductDetails product={formattedProduct} />
      </div>

      <div className="mt-16">
        <ProductDescription product={formattedProduct} />
      </div>
    </main>
  );
}