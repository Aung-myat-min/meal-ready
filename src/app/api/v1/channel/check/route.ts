import { httpResponse } from "@/backend/lib/http_res.handler";
import { CheckChannelAva } from "@/backend/services/v1/check";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/v1/channel/check
 *
 * Check Channel-Code Availability
 *
 * Auth:
 * - Required authenticated user
 *
 * Body (JSON):
 * - code: String
 *
 * @returns boolean
 *
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { channelCode } = await res.json();

  const result = await CheckChannelAva(channelCode);

  return httpResponse(result, res);
}
