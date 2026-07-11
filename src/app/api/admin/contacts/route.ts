import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import Contact from "../../../../models/Contact";

const JWT_SECRET = process.env.JWT_SECRET || "vibe_secret_key_2026_jwt_token!";

export async function GET(req: Request) {
  try {
    // 1. Authenticate
    const cookiesHeader = req.headers.get("cookie") || "";
    const tokenCookie = cookiesHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="));

    if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = tokenCookie.split("=")[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token - Unauthorized" }, { status: 401 });
    }

    // 2. Fetch from DB
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error: any) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
