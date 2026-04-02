import { NextRequest, NextResponse } from "next/server";
import JWTUtils from "./backend/lib/jwt_utils";
import { authTokenName } from "./config";

export function proxy(request: NextRequest) {
  // get cookie
  const cookies = request.cookies;

  // // determine auth status
  const authCookie = cookies.get(authTokenName);
  if (!authCookie) {
    return NextResponse.redirect(new URL("/get-ur-access-here", request.url), {
      headers: { message: "You are not authenticated!" },
    });
  } else {
    // get incoming request url
    const isAuthPage = request.nextUrl.pathname === "/get-ur-access-here";
    if (isAuthPage) {
      return NextResponse.redirect("/");
    } else {
      const isValid = JWTUtils.validate(authCookie.value);
      if (!isValid) {
        const res = NextResponse.redirect(
          new URL("/get-ur-access-here", request.url),
          {
            headers: { message: "Your Authentication Status is expired!" },
          }
        );
        res.cookies.delete(authTokenName);
        return res;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
