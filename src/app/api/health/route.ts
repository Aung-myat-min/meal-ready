import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "It is online!" }, { status: 200 });
}
