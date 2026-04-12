import { verifyAuth } from "@/app/lib/dal";
import { httpResponse } from "@/backend/lib/http_res.handler";
import { UpdateUserDetail } from "@/backend/services/v1/user";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUT /api/v1/user
 *
 * Change user data (e.g. name)
 *
 * Auth:
 * - Required authenticated user
 *
 * @returns Updated MUser
 *
 */
export async function PUT(req: NextRequest, res: NextResponse) {
  const { isAuth, userId } = await verifyAuth();
  const userData = await req.json();

  const result = await UpdateUserDetail(userId, userData);
  return httpResponse(result, res);
}
