"use client";

import Image from "next/image";
import type { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
      <table className="min-w-full">
        <thead className="border-b border-zinc-800 bg-zinc-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Image
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Brand
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Trending
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-zinc-800 hover:bg-zinc-800/40"
            >
              <td className="px-6 py-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </td>

              <td className="px-6 py-4 font-medium">
                {product.name}
              </td>

              <td className="px-6 py-4">
                {product.category}
              </td>

              <td className="px-6 py-4">
                {product.brand}
              </td>

              <td className="px-6 py-4">
                ₹{product.price}
              </td>

              <td className="px-6 py-4">
                {product.trending ? (
                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs">
                    Yes
                  </span>
                ) : (
                  <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs">
                    No
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}