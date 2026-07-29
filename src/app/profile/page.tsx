"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-sm text-zinc-400">Name</p>
            <p className="text-lg font-medium text-white">
              {user?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">Email</p>
            <p className="text-lg font-medium text-white">
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
    </main>
    </ProtectedRoute>
  );
}