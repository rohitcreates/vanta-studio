"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import type {User} from "@/types/user"

type AuthContextType={
    user: User| null;
    isAuthenticated :boolean;
    login:()=> void;
    signup:()=> void;
    logout:()=> void;

}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = user !== null;



function login() {
  
  const user = {
  id: "1",
  name: "Rohit",
  email: "rohit@gmail.com",
};

setUser(user);
localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  setUser(null);
  localStorage.removeItem("user");
}

useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    try {
      const parsedUser: User = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("user");
    }
  }
}, []);

function signup() {
  setUser({
    id: "1",
    name: "New User",
    email: "newuser@gmail.com",
  });
}

return (
  <AuthContext.Provider
    value={{
      user,
      isAuthenticated,
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