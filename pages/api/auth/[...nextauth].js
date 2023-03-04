import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import InstagramProvider from 'next-auth/providers/instagram';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // InstagramProvider({
    //   clientId: process.env.INSTAGRAM_ID,
    //   clientSecret: process.env.INSTAGRAM_SECRET,
    // }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
