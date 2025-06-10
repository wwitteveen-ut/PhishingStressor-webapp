import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  authenticateParticipant,
  authenticateResearcher,
} from "./auth/actions/actions";

export enum Role {
  PARTICIPANT = "Participant",
  RESEARCHER = "Researcher",
}

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    apiToken: string;
    role: Role;
    username: string;
    experimentId: string;
    loggedIn: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    apiToken: string;
    username: string;
    role: Role;
    experimentId: string;
    id?: string;
    loggedIn: string;
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid username or password";
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
        if (!credentials.username || !credentials.password) {
          console.warn("Missing credentials");
          return null;
        }
        const result = await authenticateParticipant(
          credentials.username as string,
          credentials.password as string
        );

        if (!result.success) {
          console.error("Authentication failed:", result.error);
          throw new InvalidLoginError();
        }

        const token = result.data;
        token.username = credentials.username;
        token.role = Role.PARTICIPANT;

        return {
          ...token,
          token: undefined,
          apiToken: token.token,
        };
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
        if (!credentials.username || !credentials.password) {
          console.log("Missing credentials");
          return null;
        }
        const result = await authenticateResearcher(
          credentials.username as string,
          credentials.password as string
        );

        if (!result.success) {
          console.log("Authentication failed:", result.error);
          throw new InvalidLoginError();
        }

        const token = result.data;
        token.username = credentials.username;
        token.role = Role.RESEARCHER;
        return {
          ...token,
          token: undefined,
          apiToken: token.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.apiToken = user.apiToken;
        token.role = user.role;
        token.loggedIn = user.loggedIn;
        token.id = user.id;
        token.experimentId = user.experimentId;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.apiToken = token.apiToken;
      session.user.role = token.role;
      session.user.experimentId = token.experimentId;
      session.user.loggedIn = token.loggedIn;
      session.user.username = token.username;
      session.user.id = token.id ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
