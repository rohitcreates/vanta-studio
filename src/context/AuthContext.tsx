"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  signup: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = user !== null;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  async function login(
    email: string,
    password: string
  ) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
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
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // Signup successful.
    // Redirect to login page from SignupForm.
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
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
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}