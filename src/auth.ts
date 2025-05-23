import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "participant",
      name: "participant",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add your authentication logic here
        console.log("credentials", credentials)
        
        // Example: validate credentials against your database
        // const user = await validateUserCredentials(credentials.email, credentials.password)
        
        // For now, returning null will always fail authentication
        // Replace this with your actual user validation logic
 
        // Return user object with their profile data
        return {
          id: 1,
          name: "a",
          email: "a",
        } as any
      },
    }),
  Credentials({
      id: "researcher",
      name: "researcher",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add your authentication logic here
        console.log("researcher", credentials)
        
        // Example: validate credentials against your database
        // const user = await validateUserCredentials(credentials.email, credentials.password)
        
        // For now, returning null will always fail authentication
        // Replace this with your actual user validation logic
 
        // Return user object with their profile data
        return {
          id: 1,
          name: "a",
          email: "a",
        } as any
      },
    }),
  ],
  pages: {
    signIn: '/login', // Optional: customize sign-in page
  },
  session: {
    strategy: "jwt",
  },
})