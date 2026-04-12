import { verifyAuth } from "@/app/lib/dal";
import { httpResponse } from "@/backend/lib/http_res.handler";
import { GetStatus, UpdateStatus } from "@/backend/services/v1/status";
import { MealStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * PATCH /api/v1/status
 *
 * Get Subscribed Channel Status
 *
 * Auth:
 * - Required authenticated user
 *
 * @returns Status
 *
 */
export async function PATCH(req: NextRequest, res: NextResponse) {
  const { channelId } = await req.json();

  const result = await GetStatus(channelId ?? "");

  return httpResponse(result, res);
}

/**
 * PUT /api/v1/status
 *
 * Updated Subscribed Channel Status
 *
 * Auth:
 * - Required authenticated user
 *
 * @returns Status
 *
 */
export async function PUT(req: NextRequest, res: NextResponse) {
  const { isAuth, userId } = await verifyAuth();
  const { channelId, newStatus } = await req.json();

  const result = await UpdateStatus(
    userId,
    channelId ?? "",
    newStatus ?? MealStatus.NONE
  );

  return httpResponse(result, res);
}
