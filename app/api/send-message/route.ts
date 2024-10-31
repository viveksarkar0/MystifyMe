import prisma from '@/lib/db'; // Import the Prisma client

export async function POST(request: Request) {
  const { username, content } = await request.json(); // Parse the incoming request

  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found', success: false }),
        { status: 404 }
      );
    }
// navigator.clipboard.writeText
    // Check if the user is accepting messages
    if (!user.isAcceptingMessages) {
      return new Response(
        JSON.stringify({ message: 'User is not accepting messages', success: false }),
        { status: 403 } // 403 Forbidden status
      );
    }

    // Create a new message entry
    const newMessage = {
      content,
      createdAt: new Date(), // Set the creation date
      userId: user.id, // Link the message to the user
    };

    // Save the new message to the database
    await prisma.message.create({
      data: newMessage,
    });

    return new Response(
      JSON.stringify({ message: 'Message sent successfully', success: true }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error', success: false }),
      { status: 500 }
    );
  }
}
