import { ChannelController } from "@/backend/controllers/channel.con";
import { CurrentStatusController } from "@/backend/controllers/current_status.con";
import ResDto from "@/backend/lib/res_dto";
import { CurrentStatus, MealStatus } from "@prisma/client";

export async function GetStatus(
  channelId: string
): Promise<ResDto<CurrentStatus>> {
  let response = ResDto.Default<CurrentStatus>();

  try {
    const status = await ChannelController.getStatus({
      data: { channelId: channelId },
    });

    if (status) {
      response = ResDto.Success("Here is the latest status", status);
    } else {
      response = ResDto.NotFound("Status Not Found");
    }
  } catch (error) {
    console.error("Error: getting status by channel:", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}

export async function UpdateStatus(
  userId: string,
  channelId: string,
  newStatus: MealStatus
): Promise<ResDto<CurrentStatus>> {
  let response = ResDto.Default<CurrentStatus>();

  try {
    const status = await ChannelController.getStatus({
      data: { channelId: channelId },
    });

    if (status) {
      status.updatedPerson = userId;
      status.mealStatus = newStatus;

      const updatedStatus = await CurrentStatusController.updateOne({
        data: status,
      });

      response = ResDto.Success("Meal Status Updated!", updatedStatus);
    } else {
      response = ResDto.NotFound("Meal Status Not Found!");
    }
  } catch (error) {
    console.error("Error: updating status: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}
