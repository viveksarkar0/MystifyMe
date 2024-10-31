import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { messageid: string } }
) {
  const messageId = parseInt(params.messageid, 10); // Ensure messageId is a number
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    // Convert user ID to a number, as Prisma expects an integer
    const userId = parseInt(session.user.id, 10);

    // Delete the message if it belongs to the authenticated user
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
  } catch (error: any) {
    console.error('Error deleting message:', error.message);
    return NextResponse.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}
