import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateParticipant } from "./auth/actions/actions"

declare module "next-auth" {
  interface Session {
    user: {
      loggedInAt: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    loggedInAt?: string | null;
  }
}

declare module "@auth/core/jwt" {  
  interface JWT {
    loggedInAt: string;
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
        // Add your authentication logic here
        console.log("credentials", credentials)
        const token = await authenticateParticipant(
          credentials?.username as string,
          credentials?.password as string
        );
        
        // Example: validate credentials against your database
        // const user = await validateUserCredentials(credentials.email, credentials.password)
        
        // For now, returning null will always fail authentication
        // Replace this with your actual user validation logic
 
        // Return user object with their profile data
        token.loggedInAt = new Date().toUTCString();
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
        // Add your authentication logic here
        console.log("credentials", credentials)
        const token = await authenticateParticipant(
          credentials?.username as string,
          credentials?.password as string
        );
        
        // Example: validate credentials against your database
        // const user = await validateUserCredentials(credentials.email, credentials.password)
        
        // For now, returning null will always fail authentication
        // Replace this with your actual user validation logic
 
        // Return user object with their profile data
        token.loggedInAt = new Date().toUTCString();
        console.log("token", token);

        return token;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.loggedInAt = user.loggedInAt || new Date().toUTCString()
      }
      return token
    },
    session({ session, token }) {
      session.user.loggedInAt = token.loggedInAt;
      return session
    },
  },
  pages: {
    signIn: '/login', // Optional: customize sign-in page
  },
  session: {
    strategy: "jwt",
  },
})