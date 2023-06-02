
import NextAuth, { Session }  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/utils/prismaSingleton";

export default NextAuth({
 
  theme: {
    colorScheme: "light",
  },
  providers: [

    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "User email",
          type: "text",
          placeholder: "User email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        // console.log(user);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.accessTokenExpires,
        };
      }

      return token;
    },
    async session({ session, token }: { session: Session, token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // サインイン・サインアウトで飛ぶカスタムログインページを指定
 
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
  
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});