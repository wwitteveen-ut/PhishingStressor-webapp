import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateParticipant, authenticateResearcher } from "./auth/actions/actions"

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      experimentId: string;
      loggedIn: string;
    } & DefaultSession["user"]
  }

  interface User {
    username: string;
    experimentId: string;
    loggedIn: string;
  }
}

declare module "@auth/core/jwt" {  
  interface JWT {
    username: string;
    experimentId: string;
    id?:string;
    loggedIn: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "participant",
      name: "participant",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        console.log("credentials", credentials)
        const token = await authenticateParticipant(
          credentials?.username as string,
          credentials?.password as string
        );
        
        token.username = credentials.username;

        console.log("token", token);

        return token;
      },
    }),
  Credentials({
      id: "researcher",
      name: "researcher",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        console.log("credentials", credentials)
        const token = await authenticateResearcher(
          credentials?.username as string,
          credentials?.password as string
        );

        return token;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.loggedIn = user.loggedIn;
        token.id = user.id;
        token.experimentId = user.experimentId;
        token.username = user.username;
      }
      return token
    },
    session({ session, token }) {
      session.user.experimentId = token.experimentId;
      session.user.loggedIn = token.loggedIn;
      session.user.username = token.username;
      session.user.id = token.id ?? '';
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
})