import type { ReactNode } from "react";
import AdminRoute from "@/components/auth/AdminRoute";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-7xl">
          <aside className="min-h-screen w-64 border-r border-zinc-800 p-6">
            <h2 className="mb-8 text-2xl font-bold">
              Admin Panel
            </h2>

            <nav className="space-y-3">
              <Link
                href="/admin"
                className="block rounded-lg px-4 py-2 hover:bg-zinc-800"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/products"
                className="block rounded-lg px-4 py-2 hover:bg-zinc-800"
              >
                Products
              </Link>

              <Link
                href="/admin/orders"
                className="block rounded-lg px-4 py-2 hover:bg-zinc-800"
              >
                Orders
              </Link>

              <Link
                href="/admin/users"
                className="block rounded-lg px-4 py-2 hover:bg-zinc-800"
              >
                Users
              </Link>
            </nav>
          </aside>

          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminRoute>
  );
}