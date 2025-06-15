import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  authenticateParticipant,
  authenticateResearcher,
  getParticipantExperimentDetails,
} from "./auth/actions/actions";

export enum Role {
  PARTICIPANT = "Participant",
  RESEARCHER = "Researcher",
}

declare module "next-auth" {
  interface Session {
    user: Omit<User, "experimentExpiry">;
  }

  interface User {
    apiToken: string;
    role: Role;
    username: string;
    experimentId: string;
    loggedIn: string;
    experimentExpiry?: number;
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
    experimentExpiry?: number;
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid username or password";
}

class NoLongerAccessToExperimentError extends CredentialsSignin {
  code = "No access to experiment";
}

class ExperimentExpiredError extends CredentialsSignin {
  code = "The experiment session has expired";
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
          throw new NoLongerAccessToExperimentError();
        }

        const token = result.data;

        const participantExperiment = await getParticipantExperimentDetails(
          token
        );
        if (!participantExperiment.success) {
          console.error(
            "Failed to get participant experiment details:",
            participantExperiment.error
          );
          throw new NoLongerAccessToExperimentError();
        }

        const duration = participantExperiment.data.duration;
        const loginTime = new Date(token.loggedIn);
        const expirationTime = new Date(
          loginTime.getTime() + duration * 60 * 1000
        );

        if (new Date() > expirationTime) {
          throw new ExperimentExpiredError();
        }

        token.username = credentials.username;
        token.role = Role.PARTICIPANT;
        return {
          ...token,
          token: undefined,
          apiToken: token.token,
          experimentExpiry: expirationTime.getTime(),
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
          throw new InvalidLoginError();
        }
        const result = await authenticateResearcher(
          credentials.username as string,
          credentials.password as string
        );
        if (!result.success) {
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
        token.experimentExpiry = user.experimentExpiry;
      }

      if (token.role === Role.PARTICIPANT && token.experimentExpiry) {
        if (Date.now() > token.experimentExpiry) {
          return null;
        }
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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = !nextUrl.pathname.startsWith("/login");

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
    updateAge: 60 * 60,
  },
});
