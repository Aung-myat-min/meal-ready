import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { authTokenName } from "@/config";
import JWTUtils from "@/backend/lib/jwt_utils";
import { redirect } from "next/navigation";

export const verifyAuth = cache(async () => {
  const cookie = (await cookies()).get(authTokenName)?.value;
  const session = await JWTUtils.validate(cookie ?? "");

  if (!session?.userId) {
    redirect("/get-ur-access-here");
  }

  return { isAuth: true, userId: session.userId };
});
