"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

 function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  login();

  router.push("/");
}

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-2 text-sm text-zinc-400">
        Sign in to your Vanta Studio account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-white hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}