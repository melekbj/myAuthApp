import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      firstName?: string | null
      lastName?: string | null
      dateOfBirth?: string | null
      address?: string | null
      phoneNumber?: string | null
    }
  }

  interface User {
    firstName?: string | null
    lastName?: string | null
    dateOfBirth?: string | null
    address?: string | null
    phoneNumber?: string | null
  }
}