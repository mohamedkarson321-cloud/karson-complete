import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import type { UserRole } from "@prisma/client";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    verifyRequest: "/verify-email",
    newUser: "/onboarding",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              password: true,
              role: true,
              status: true,
              emailVerified: true,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          if (user.status === "SUSPENDED" || user.status === "DELETED") {
            throw new Error("Account suspended or deleted.");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: {
              lastLoginAt: new Date(),
              loginCount: { increment: 1 },
            },
          });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }
      // Block unverified credential users
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: { emailVerified: true, status: true },
      });
      if (!dbUser) return false;
      if (dbUser.status === "SUSPENDED" || dbUser.status === "DELETED") {
        return false;
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: UserRole }).role;
        token.email = user.email;
      }
      // Handle manual session update
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      // Refresh role from DB on each token creation
      if (token.id && !user) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { role: true, status: true, name: true, image: true },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.name = dbUser.name;
            token.picture = dbUser.image;
          }
        } catch {
          // Token might be stale, continue
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  events: {
    async createUser({ user }) {
      // Send welcome email on new user creation
      if (user.email) {
        await prisma.notification.create({
          data: {
            userId: user.id!,
            title: "Welcome to KARSON! 🚀",
            message:
              "Your account has been created successfully. Explore our platform and start building with AI.",
            type: "INFO",
          },
        });
      }
    },
    async signIn({ user }) {
      if (user.id) {
        await prisma.userActivity.create({
          data: {
            userId: user.id,
            type: "AUTH",
            action: "SIGN_IN",
          },
        });
      }
    },
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
