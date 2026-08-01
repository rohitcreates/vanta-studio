"use client";

import type { Product } from "@/types/product";

type DeleteProductDialogProps = {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DeleteProductDialog({
  product,
  onClose,
  onSuccess,
}: DeleteProductDialogProps) {
  if (!product) return null;

  async function handleDelete() {
    if (!product) return;
    try {
      const response = await fetch(
        `/api/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white">
          Delete Product
        </h2>

        <p className="mt-4 text-zinc-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            {product.name}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-red-400">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-5 py-2 text-white hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}