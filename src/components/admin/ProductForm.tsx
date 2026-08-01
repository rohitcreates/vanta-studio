"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

type ProductFormProps = {
  product: Product | null;
  onSuccess: () => void;
  onClose: () => void;
};

const initialForm = {
  name: "",
  category: "",
  brand: "",
  price: 0,
  image: "",
  description: "",
  rating: 0,
  reviews: 0,
  sizes: "",
  colors: "",
  trending: false,
};

export default function ProductForm({
  product,
  onSuccess,
  onClose,
}: ProductFormProps) {
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        image: product.image,
        description: product.description,
        rating: product.rating,
        reviews: product.reviews,
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
        trending: product.trending,
      });
    } else {
      setForm(initialForm);
    }
  }, [product]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const target = e.target;
    const { name, value } = target;

   if (
  target instanceof HTMLInputElement &&
  target.type === "checkbox"
) {
  setForm((prev) => ({
    ...prev,
    [name]: target.checked,
  }));

  return;
}

    setForm((prev) => ({
  ...prev,
  [name]:
    target instanceof HTMLInputElement &&
    target.type === "number"
      ? Number(value)
      : value,
}));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const body = {
        ...form,
        sizes: form.sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean),

        colors: form.colors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),
      };

      const response = await fetch(
        product
          ? `/api/products/${product.id}`
          : "/api/products",
        {
          method: product ? "PATCH" : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        required
      />

      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        required
      />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          className="rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="number"
          name="reviews"
          placeholder="Reviews"
          value={form.reviews}
          onChange={handleChange}
          className="rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />
      </div>

      <input
        name="sizes"
        placeholder="Sizes (S, M, L)"
        value={form.sizes}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
      />

      <input
        name="colors"
        placeholder="Colors (Black, White)"
        value={form.colors}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="trending"
          checked={form.trending}
          onChange={handleChange}
        />

        Trending Product
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-zinc-700 px-5 py-3"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
}