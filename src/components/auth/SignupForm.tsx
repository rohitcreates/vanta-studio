"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signup(
        name,
        username,
        email,
        password
      );

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Create Account
      </h1>

      <p className="mt-2 text-sm text-zinc-400">
        Join Vanta Studio today.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Username
          </label>

          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-white hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}