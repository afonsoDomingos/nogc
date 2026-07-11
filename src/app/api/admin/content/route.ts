import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import Content from "../../../../models/Content";

const JWT_SECRET = process.env.JWT_SECRET || "vibe_secret_key_2026_jwt_token!";

export async function PUT(req: Request) {
  try {
    // 1. Verify Authentication from Cookie
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

    // 2. Database Connection
    await dbConnect();
    const body = await req.json();

    // 3. Update or Create site settings document
    let siteContent = await Content.findOne();
    if (!siteContent) {
      siteContent = new Content(body);
    } else {
      // Overwrite existing fields
      Object.assign(siteContent, body);
    }

    await siteContent.save();

    return NextResponse.json({ success: true, data: siteContent }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating dynamic content:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
