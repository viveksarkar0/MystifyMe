import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest, 
  context: { params: { messageid: string } } // Use context instead of destructuring
) {
  const { messageid } = context.params; // Destructure messageid from context
  const messageId = parseInt(messageid, 10); // Ensure messageId is a number
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const userId = parseInt(session.user.id, 10);

    const deleteResult = await prisma.message.deleteMany({
      where: {
        id: messageId,
        userId: userId, // Ensure `userId` is an integer
      },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', (error as Error).message);
    return NextResponse.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}
