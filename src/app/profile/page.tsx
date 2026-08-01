"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

type Order = {
  id: number;
  total: number;
  status: string;
  createdAt: string;
};

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;

      try {
        const response = await fetch(
          `/api/orders?userId=${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">
          My Profile
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">
              Account
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-zinc-400">
                  Name
                </p>

                <p className="text-lg text-white">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-400">
                  Username
                </p>

                <p className="text-lg text-white">
                  {user?.username}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-400">
                  Email
                </p>

                <p className="text-lg text-white">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={logout}
                className="mt-6 w-full rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">
              Recent Orders
            </h2>

            {loading ? (
              <p className="text-zinc-400">
                Loading...
              </p>
            ) : orders.length === 0 ? (
              <p className="text-zinc-400">
                No orders yet.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-zinc-700 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        Order #{order.id}
                      </h3>

                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                        {order.status}
                      </span>
                    </div>

                    <p className="mt-2 text-zinc-300">
                      ₹{order.total.toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}