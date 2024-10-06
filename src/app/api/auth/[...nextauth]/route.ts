import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import type { Session, User } from "next-auth"; // Import types

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id; // Add user ID to the session
        session.user.firstName = (user as any).firstName || null;
        session.user.lastName = (user as any).lastName || null;
        session.user.dateOfBirth = (user as any).dateOfBirth || null;
        session.user.address = (user as any).address || null;
        session.user.phoneNumber = (user as any).phoneNumber || null;
      }
      return session;
    },
  },
};

// Create the NextAuth API handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
