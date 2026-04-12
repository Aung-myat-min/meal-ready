import { verifyAuth } from "@/app/lib/dal";
import { httpResponse } from "@/backend/lib/http_res.handler";
import {
  CreateChannel,
  UpdateChannelDetail,
} from "@/backend/services/v1/channel";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUT /api/v1/channel
 *
 * Update channel data (e.g. name)
 *
 * Auth:
 * - Required authenticated user & owner status
 *
 * @returns Updated Channel
 *
 */
export async function PUT(req: NextRequest, res: NextResponse) {
  const { channelId, ...data } = await req.json();

  const result = await UpdateChannelDetail(channelId, data);

  return httpResponse(result, res);
}

/**
 * POST /api/v1/channel
 *
 * Create new channel
 *
 * Auth:
 * - Required authenticated user
 *
 * @returns Channel
 *
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { channelName, channelCode, channelOwner } = await req.json();

  const result = await CreateChannel(channelName, channelCode, channelOwner);

  return httpResponse(result, res);
}
