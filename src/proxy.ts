import { NextRequest, NextResponse } from "next/server";
import JWTUtils from "./backend/lib/jwt_utils";
import { authTokenName } from "./config";

export function proxy(request: NextRequest) {
  // get cookie
  const cookies = request.cookies;

  // determine auth status && route
  const isAuthPage = request.nextUrl.pathname === "/get-ur-access-here";
  const authCookie = cookies.get(authTokenName);
  let isValid = null;

  // validation
  if (authCookie) {
    isValid = JWTUtils.validate(authCookie.value);
  }

  // redirect and actions
  if (isAuthPage) {
    if (isValid) {
      return NextResponse.redirect("/");
    }
  } else {
    if (!isValid) {
      const res = NextResponse.redirect(
        new URL("/get-ur-access-here", request.url),
        {
          headers: { message: "Authentication Status Not Valid!" },
        }
      );
      res.cookies.delete(authTokenName);
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/.*/auth/.*).*)"],
};
