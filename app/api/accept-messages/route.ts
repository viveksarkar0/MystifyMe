import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
// Adjust the path as necessary
import { User } from 'next-auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = user.id; // Ensure this matches your user ID field
  const { acceptMessages } = await request.json();

  try {
    // Update the user's message acceptance status
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) }, // Match the user by ID
      data: { isAcceptingMessages: acceptMessages }, // Update the field
    });

    // Successfully updated message acceptance status
    return Response.json(
      {
        success: true,
        message: 'Message acceptance status updated successfully',
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error: unknown) { // Change here to use unknown
    if (error instanceof Error) {
      console.error('Error updating message acceptance status:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }

    return Response.json(
      { success: false, message: 'Error updating message acceptance status' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Check if the user is authenticated
  if (!session || !user) {
    console.log('Authentication failed. Session or user is missing.');
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = parseInt(user.id, 10); // Convert user.id to an integer

  if (isNaN(userId)) {
    console.error('Invalid user ID:', user.id);
    return Response.json(
      { success: false, message: 'Invalid user ID' },
      { status: 400 }
    );
  }

  console.log('User ID:', userId); // Log user ID for verification

  try {
    // Retrieve the user from the database using the converted ID
    const foundUser = await prisma.user.findUnique({
      where: { id: userId }, // Now userId is an integer
    });

    if (!foundUser) {
      console.log('User not found for ID:', userId);
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return the user's message acceptance status
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error: unknown) { // Change here to use unknown
    if (error instanceof Error) {
      console.error('Error retrieving message acceptance status:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }

    // Ensure the response payload is always an object
    return Response.json(
      { success: false, message: 'Error retrieving message acceptance status' },
      { status: 500 }
    );
  }
}
