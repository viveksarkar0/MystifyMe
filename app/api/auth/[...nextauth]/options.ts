import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Username or Email', type: 'text' }, // Updated label for clarity
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        console.log('Credentials received:', credentials); // Log incoming credentials
      
        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.identifier },
                { username: credentials.identifier }
              ],
            },
          });
      
          console.log('User found:', user); // Log the user found in the database
      
          if (!user) {
            throw new Error('No user found with this email or username');
          }
      
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
      
          if (isPasswordCorrect) {
            return user; // Return user if authentication is successful
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          console.error('Authorization error:', err); // Log the error
          throw new Error(err.message || 'An error occurred during authorization');
        }
      }

      
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString(); 
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; 
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt', 
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: '/sign-in', // Ensure this points to your custom sign-in page correctly
  },
};
