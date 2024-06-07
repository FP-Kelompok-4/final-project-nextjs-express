import NextAuth from "next-auth"
import authConfig from "@/auth.config"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3,
  },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user.role = token.role
        session.user.isVerified = token.isVerified
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isVerified = user.isVerified;
      }

      return token;
    }
  }
});
