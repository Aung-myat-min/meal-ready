import { UserController } from "@/backend/controllers/user.con";
import ResDto from "@/backend/lib/res_dto";
import { MUser } from "@prisma/client";

export async function UpdateUserDetail(
  userId: string,
  updatedUser: Partial<MUser>
): Promise<ResDto<MUser>> {
  let response = ResDto.Default<MUser>();

  try {
    const user = await UserController.getOne({ data: { userId: userId } });

    if (user) {
      const update = await UserController.updateOne({ data: updatedUser });

      response = ResDto.Success("Updated user details", update);
    } else {
      response = ResDto.NotFound("User not found");
    }
  } catch (error) {
    console.error("Error: updating user data: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}
