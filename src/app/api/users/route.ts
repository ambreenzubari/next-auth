import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEm", token)
  try {
    // Verify the JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    // Fetch users if token is valid
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.json(
      { error: "Unauthorized or Invalid Token" },
      { status: 401 }
    );
  }
}
