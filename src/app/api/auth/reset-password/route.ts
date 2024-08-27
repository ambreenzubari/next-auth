import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../config/prismaClient'; // Adjust the import path as needed

export async function POST(request: Request) {
  const { email, newPassword } = await request.json();
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  try {
    // Find the user and update the password
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
