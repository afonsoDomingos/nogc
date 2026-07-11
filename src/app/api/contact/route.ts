import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Contact from "../../../models/Contact";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, subject, message } = await req.json();

    // Field validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return NextResponse.json({ success: true, message: "Inquiry saved successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Save contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
