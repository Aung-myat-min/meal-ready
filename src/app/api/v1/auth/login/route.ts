import { LogController } from "@/backend/controllers/log.con";
import { UserController } from "@/backend/controllers/user.con";
import { httpResponse } from "@/backend/lib/http_res.handler";
import JWTUtils from "@/backend/lib/jwt_utils";
import PasswordUtils from "@/backend/lib/password_utils";
import ResDto from "@/backend/lib/res_dto";
import { LogEnum, MUser } from "@/generated/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: NextResponse,
): Promise<ResDto<MUser>> {
  let result = ResDto.Default<MUser>();
  try {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    if (
      email &&
      password &&
      email === typeof "string" &&
      password === typeof "string"
    ) {
      // get user
      const user = await UserController.getOneWithEmail({
        data: { userEmail: email },
      });

      if (user) {
        // match email & password
        const matching = await PasswordUtils.compare({
          password: password,
          hash: user.password,
        });

        if (matching) {
          // jwt generate & assign cookie
          const token = JWTUtils.sign(user.userId);
          response.cookies.set("authCard", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: Number(process.env.JWT_TIME),
            path: "/",
          });
          // log generate
          LogController.create({
            data: {
              logType: LogEnum.AUTH,
              logString: `${user.userEmail} has logged in.`,
            },
          });
        } else {
          // password wrong
          result = ResDto.Fail("Wrong Credentials!");
        }
      } else {
        // not found
        result = ResDto.NotFound("User Not Found!");
      }
    } else {
      result = ResDto.Fail("Invalid Data!");
    }
  } catch (error) {
    console.error("Error: Server Error When user logining: ", error);
    result = ResDto.Fail("Server Error");
  }
  return httpResponse(result, response);
}
