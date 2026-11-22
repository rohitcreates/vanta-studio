import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/validations/login";
import bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user) {
          return null;
        }

        const passwordIsValid = await bcrypt.compare(
          parsed.data.password,
          user.password
        );

        if (!passwordIsValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = Number(token.id);
        session.user.username = String(token.username ?? "");
        session.user.role =
          token.role === "ADMIN" ? "ADMIN" : "CUSTOMER";
      }

      return session;
    },
  },
};
