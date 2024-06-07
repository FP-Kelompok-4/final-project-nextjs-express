import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { SigninSchema } from "./schemas/auth-schema";
import { api } from "./lib/axios";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SigninSchema.safeParse(credentials);

        if (validatedFields.success) {
          const user = await api.post("users/by-email", validatedFields.data);

          return user.data.data
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
