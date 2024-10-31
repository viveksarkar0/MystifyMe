import prisma from '@/lib/db'; // Import the Prisma client
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);
  const _user: User | null = session?.user;

  // Check if the user is authenticated
  if (!session || !_user) {
    return new Response(
      JSON.stringify({ success: false, message: 'Not authenticated' }),
      { status: 401 }
    );
  }

  try {
    // Retrieve messages for the authenticated user
    const userid =  Number(_user.id); // Ensure this matches the structure of your user object
    const messages = await prisma.message.findMany({
      where: { userId: userid }, 
      orderBy: { createdAt: 'desc' }, // Order messages by creation date in descending order
    });

    // Check if messages were found
    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No messages found', success: false }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ messages }),
      { status: 200 }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error', success: false }),
      { status: 500 }
    );
  }
}
