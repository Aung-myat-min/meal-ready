import { UserController } from "@/backend/controllers/user.con";
import ResDto from "@/backend/lib/res_dto";

export async function LeaveSubscription(userId: string): Promise<ResDto<void>> {
  let response = ResDto.Default<void>();

  try {
    await UserController.leaveChannel({ data: { userId } });
    response = ResDto.Success("Success");
  } catch (error) {
    console.error("Error: leaving subscription: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}
