import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import "firebase/firestore";
import firestore from "@/lib/db";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirebaseAdapter(firestore),
  callbacks: {
    async session(session, token) {
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.id, role: token.role || null },
      });
    },
  },
});
