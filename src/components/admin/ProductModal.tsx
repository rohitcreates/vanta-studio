"use client";

import type { Product } from "@/types/product";
import ProductForm from "./ProductForm";

type ProductModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ProductModal({
  open,
  product,
  onClose,
  onSuccess,
}: ProductModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-zinc-950 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-400 transition hover:text-white"
          >
            ×
          </button>
        </div>

        <ProductForm
          product={product}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
}