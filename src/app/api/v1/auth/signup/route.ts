import { LogController } from "@/backend/controllers/log.con";
import { UserController } from "@/backend/controllers/user.con";
import { httpResponse } from "@/backend/lib/http_res.handler";
import PasswordUtils from "@/backend/lib/password_utils";
import ResDto from "@/backend/lib/res_dto";
import { LogEnum, MUser } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: NextResponse,
): Promise<ResDto<MUser>> {
  let result = ResDto.Default<MUser>();
  try {
    const data = await request.formData();
    const email = data.get("userEmail");
    const password = data.get("password");
    const name = data.get("userName");
    let data_validate = false;
    let message = "";
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );

    // validate name, email, password
    if (typeof name === "string" && name.length < 3) {
      data_validate = true;
      message += "Name cannot be shorter than 3 characters\n";
    }
    if (typeof email === "string" && !emailRegex.test(email)) {
      data_validate = true;
      message += "Invalid Email\n";
    }
    if (typeof password === "string" && password.length < 8) {
      data_validate = true;
      message += "Password cannot be shorter than 8 characters\n";
    }
    if (data_validate) {
      result = ResDto.Fail(message);
    } else {
      // hash password
      const hashedPass = await PasswordUtils.hash(password as string);
      // create new user
      const newUser = await UserController.create({
        data: {
          userName: name as string,
          userEmail: email as string,
          hashedPass: hashedPass,
        },
      });

      newUser.password = "";
      result = ResDto.Success("Successfully Registered!", newUser);

      // log generate
      LogController.create({
        data: {
          logType: LogEnum.AUTH,
          logString: `${newUser.userEmail} has signed up.`,
        },
      });
    }
  } catch (error) {
    console.error("Error: Server Error When user signing up: ", error);
    result = ResDto.Fail("Server Error");
  }
  return httpResponse(result, response);
}
