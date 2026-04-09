import { ChannelController } from "@/backend/controllers/channel.con";
import { SubscriptionController } from "@/backend/controllers/subscription.con";
import { UserController } from "@/backend/controllers/user.con";
import ResDto from "@/backend/lib/res_dto";
import { HomeReturn } from "@/backend/lib/util_types";
import { MealStatus } from "@prisma/client";

export async function GetHomeData(userId: string): Promise<ResDto<HomeReturn>> {
  let response = ResDto.Default<HomeReturn>();

  try {
    const data: HomeReturn = {
      user: {
        name: "",
        email: "",
      },
      channel: {
        channelId: null,
        channelName: null,
      },
      status: {
        status: MealStatus.NONE,
        updatedName: "",
      },
      subscribtors: [],
    };

    // get user data
    const user = await UserController.getOne({ data: { userId: userId } });
    if (user) {
      data.user.name = user.userName;
      data.user.email = user.userEmail;

      // get fellow subscribtors' names and channel name
      const sub = await SubscriptionController.getSubByUserId({
        data: { userId: userId },
      });
      if (sub) {
        const names = await UserController.getUserNameBySubCode({
          data: { subCode: sub.subscription!.subscriptionCode },
        });
        const channel = await ChannelController.getChannelBySubCode({
          data: { subCode: sub.subscription!.subscriptionCode },
        });
        data.subscribtors = names;
        data.channel.channelId = channel?.channelId ?? null;
        data.channel.channelName = channel?.channelName ?? null;
      } else {
        response = ResDto.NotFound(
          "User Haven't Subscribed to Any Channel!",
          data
        );
      }

      // get latest status
      if (data.channel.channelId) {
        const status = await ChannelController.getStatus({
          data: { channelId: data.channel.channelId },
        });

        if (status) {
          data.status.status = status.mealStatus;
          if (status.updatedPerson) {
            const updatedPerson = await UserController.getOne({
              data: { userId: status.updatedPerson },
            });
            data.status.updatedName = updatedPerson?.userName ?? "";
          }
        }
      }
    } else {
      response = ResDto.NotFound("User Not Found!");
    }
  } catch (error) {
    console.error("Error: Getting Requried data for Home Page!");
    response = ResDto.Fail("Server Error");
  }

  return response;
}
