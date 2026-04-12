import { verifyAuth } from "@/app/lib/dal";
import { httpResponse } from "@/backend/lib/http_res.handler";
import { addSubscription } from "@/backend/services/v1/subscribe";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/v1/subscribe
 *
 * Joining a channel subscription
 *
 * Auth:
 * - Required authenticated user
 *
 * @returns boolean
 *
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { isAuth, userId } = await verifyAuth();
  const { channelCode } = await res.json();

  const result = await addSubscription(userId, channelCode);

  return httpResponse(result, res);
}
