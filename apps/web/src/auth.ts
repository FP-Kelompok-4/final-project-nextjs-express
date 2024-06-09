import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { api } from "./lib/axios";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const isExistEmail = await api.post("users/by-email", { email: profile?.email })

          if (!isExistEmail.data.data.provider) return false;

          return true;
        } catch (e) {
          const payload = {
            name: profile?.given_name + " " + profile?.family_name,
            email: profile?.email,
            provider: account.provider,
            image: profile?.picture,
            role: "USER",
          };
          
          await api.post("users/", payload);

          return true;
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.role = token.role
        session.user.isVerified = token.isVerified
      }

      return session
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        token.isVerified = profile?.email_verified as boolean | undefined;
        token.role = "USER";

        return token;
      }

      if (user) {
        token.role = user.role;
        token.isVerified = user.isVerified;
      }

      return token;
    }
  }
});
