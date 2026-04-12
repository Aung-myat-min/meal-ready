import { verifyAuth } from "@/app/lib/dal";
import { httpResponse } from "@/backend/lib/http_res.handler";
import { LeaveSubscription } from "@/backend/services/v1/leave";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/v1/channel
 *
 * Leave channel subscription
 *
 * Auth:
 * - Required authenticated user
 *
 * Body (JSON):
 * - subscriptionId: string
 *
 * @returns Updated Channel
 *
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { isAuth, userId } = await verifyAuth();

  const result = await LeaveSubscription(userId);

  return httpResponse(result, res);
}
