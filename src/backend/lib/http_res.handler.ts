import { NextResponse } from "next/server";
import ResDto from "./res_dto";
import { OperationStatus } from "./util_types";

export function httpResponse(
  r: ResDto<unknown>,
  response: NextResponse,
): NextResponse {
  try {
    switch (r.status) {
      case OperationStatus.success:
        response = NextResponse.json(r, { status: 200 });
      case OperationStatus.fail:
        response = NextResponse.json(r, { status: 400 });
      case OperationStatus.notfound:
        response = NextResponse.json(r, { status: 404 });
      default:
        response = NextResponse.json(r, { status: 500 });
    }
  } catch (error) {
    console.error(`Error Returning HTTP Response: ${error}`);
    response = NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }

  return response;
}
