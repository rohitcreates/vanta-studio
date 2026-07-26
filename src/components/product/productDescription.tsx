import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductDescription({ product }: Props) {
  return (
    <section className="mt-20 rounded-2xl border border-gray-700 bg-zinc-900 p-8">
      <h2 className="mb-6 text-3xl font-bold">
        Product Description
      </h2>

      <p className="leading-8 text-gray-300">
        {product.description}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold">
            Features
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>• Premium Fabric</li>
            <li>• Relaxed Fit</li>
            <li>• Breathable Material</li>
            <li>• Machine Washable</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">
            Shipping
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>• Free Shipping over $75</li>
            <li>• 30-Day Returns</li>
            <li>• Secure Checkout</li>
            <li>• Fast Delivery</li>
          </ul>
        </div>
      </div>
    </section>
  );
}