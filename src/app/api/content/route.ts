import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Content from "../../../models/Content";

export async function GET() {
  try {
    await dbConnect();
    // Retrieve the first content document (usually the only one)
    const siteContent = await Content.findOne();
    if (siteContent) {
      return NextResponse.json({ fallback: false, data: siteContent }, { status: 200 });
    }
    // If no document exists in MongoDB, let the client use local static translations
    return NextResponse.json({ fallback: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching dynamic content:", error);
    return NextResponse.json({ fallback: true, error: error.message }, { status: 200 });
  }
}
