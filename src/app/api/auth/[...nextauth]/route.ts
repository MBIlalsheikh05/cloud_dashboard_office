import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// 1️⃣ authOptions typed correctly
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Admin credentials
        if (
          credentials?.email === "admin@dashboard.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@dashboard.com",
            role: "admin"
          }
        }
        // User credentials
        if (
          credentials?.email === "user@dashboard.com" &&
          credentials?.password === "user123"
        ) {
          return {
            id: "2",
            name: "User",
            email: "user@dashboard.com",
            role: "user"
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  session: { strategy: "jwt" }, // ✅ TS now happy
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" }
}

// 2️⃣ NextAuth handler
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
