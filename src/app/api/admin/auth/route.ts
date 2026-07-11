import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import User from "../../../../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "vibe_secret_key_2026_jwt_token!";

// POST /api/admin/auth -> Login
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Sign JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    const response = NextResponse.json(
      { success: true, message: "Logged in successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/admin/auth -> Verify token
export async function GET(req: Request) {
  try {
    // Read cookie header manually or via NextRequest
    const cookiesHeader = req.headers.get("cookie") || "";
    const tokenCookie = cookiesHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="));

    if (!tokenCookie) {
      return NextResponse.json(
        { authenticated: false, error: "No token found" },
        { status: 401 }
      );
    }

    const token = tokenCookie.split("=")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json(
      { authenticated: true, user: decoded },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { authenticated: false, error: "Invalid token" },
      { status: 401 }
    );
  }
}

// DELETE /api/admin/auth -> Logout
export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
