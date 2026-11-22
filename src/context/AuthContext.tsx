"use client";

import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name ?? "",
        username: session.user.username,
        email: session.user.email ?? "",
        role: session.user.role,
      }
    : null;

  const isAuthenticated = user !== null;
  const loading = status === "loading";

  async function login(email: string, password: string) {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      throw new Error("Invalid email or password.");
    }
  }

  async function signup(
    name: string,
    username: string,
    email: string,
    password: string
  ) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? "Unable to create account.");
    }
  }

  async function logout() {
    await signOut({ redirect: false });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
