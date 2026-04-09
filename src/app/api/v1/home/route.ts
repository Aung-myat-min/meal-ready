import { NextResponse } from "next/server";

/**
 * GET /api/v1/home
 *
 * Fetches necessary Date For Home Page
 *
 * Auth:
 * - Required authenticated user
 *
 * @returns {Object}
 * - user: { name: string & email: string }
 * - channelName: string
 * - status: {status: Status & updatedName: string }
 * - subscribtors: string[]
 */
export async function GET() {
  return NextResponse.json({ message: "Not Implemented!" });
}
