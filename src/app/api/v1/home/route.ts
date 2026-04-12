import { verifyAuth } from "@/app/lib/dal";
import { httpResponse } from "@/backend/lib/http_res.handler";
import { GetHomeData } from "@/backend/services/v1/home";
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
export async function GET(response: NextResponse) {
  const { isAuth, userId } = await verifyAuth();

  const result = await GetHomeData(userId);

  return httpResponse(result, response);
}
