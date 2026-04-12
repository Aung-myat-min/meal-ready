import { ChannelController } from "@/backend/controllers/channel.con";
import { UserController } from "@/backend/controllers/user.con";
import ResDto from "@/backend/lib/res_dto";

export async function addSubscription(
  userId: string,
  channelCode: string
): Promise<ResDto<void>> {
  let response = ResDto.Default<void>();

  try {
    const channel = await ChannelController.getByCode({
      data: { channelCode },
    });
    if (channel) {
      const status = await UserController.addSub({
        data: {
          userId,
          subscriptionCode: channel.associatedSub?.subscriptionCode!,
        },
      });
      if (status) {
        response = ResDto.Success("Joining channel successful");
      } else {
        response = ResDto.Fail("Joining Channel Fail");
      }
    } else {
      response = ResDto.NotFound("Channel not found");
    }
  } catch (error) {
    console.error("Error: joing a subscription: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}
