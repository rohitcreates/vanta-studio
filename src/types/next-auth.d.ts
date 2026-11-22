import type { DefaultSession } from "next-auth";

type AppRole = "ADMIN" | "CUSTOMER";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      role: AppRole;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: AppRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    username?: string;
    role?: AppRole;
  }
}
