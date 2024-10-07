import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import type { Session, User } from "next-auth";

const prisma = new PrismaClient();

// Extend the User type to include your custom fields
interface CustomUser extends User {
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
}

// Extend the Session type to include the custom user
interface CustomSession extends Session {
  user: CustomUser;
}

// Define the auth options
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: CustomSession; user: CustomUser }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.firstName = user.firstName || null;
        session.user.lastName = user.lastName || null;
        session.user.dateOfBirth = user.dateOfBirth || null;
        session.user.address = user.address || null;
        session.user.phoneNumber = user.phoneNumber || null;
      }
      return session;
    },
  },
};

// Create and export NextAuth handler for API routes
const handler = NextAuth(authOptions);

// Explicitly export the handler for both GET and POST
export { handler as GET, handler as POST };
