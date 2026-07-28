"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-6">
      <div className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-10 text-center shadow-lg">
        <CheckCircle
          size={80}
          className="mx-auto mb-6 text-green-500"
        />

        <h1 className="mb-4 text-4xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mb-8 max-w-md text-zinc-400">
          Thank you for shopping with Vanta Studio.
          Your order has been received and is being
          processed.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/allProducts"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-black"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}