"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

import ProductTable from "@/components/admin/ProductTable";
import ProductModal from "@/components/admin/ProductModal";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await fetch("/api/products");
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-700"
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsModalOpen(true);
        }}
        onDelete={(product) =>
          setDeletingProduct(product)
        }
      />

      <ProductModal
        open={isModalOpen}
        product={editingProduct}
        onClose={() => {
          setEditingProduct(null);
          setIsModalOpen(false);
        }}
        onSuccess={fetchProducts}
      />

      <DeleteProductDialog
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onSuccess={fetchProducts}
      />
    </>
  );
}