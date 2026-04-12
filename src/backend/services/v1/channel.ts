import { ChannelController } from "@/backend/controllers/channel.con";
import ResDto from "@/backend/lib/res_dto";
import { Channel } from "@prisma/client";

export async function UpdateChannelDetail(
  channelId: string,
  updateChannel: Partial<Channel>
): Promise<ResDto<Channel>> {
  let response = ResDto.Default<Channel>();

  try {
    const channel = await ChannelController.getOne({
      data: { channelId: channelId },
    });
    if (channel) {
      const updatedChannel = await ChannelController.updateOne({
        data: updateChannel,
      });

      response = ResDto.Success("Channel updated", updatedChannel);
    } else {
      response = ResDto.NotFound("Channel not found");
    }
  } catch (error) {
    console.error("Error: updating channel details: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}

export async function CreateChannel(
  channelName: string,
  channelCode: string,
  channelOwner: string
): Promise<ResDto<Channel>> {
  let response = ResDto.Default<Channel>();

  try {
    const newChannel = await ChannelController.create({
      data: { channelName, channelCode, channelOwner },
    });

    response = ResDto.Success("New channel created", newChannel);
  } catch (error) {
    console.error("Error: creating channel: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}
