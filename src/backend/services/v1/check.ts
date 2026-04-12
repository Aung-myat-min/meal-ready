import { ChannelController } from "@/backend/controllers/channel.con";
import ResDto from "@/backend/lib/res_dto";

export async function CheckChannelAva(
  channelCode: string
): Promise<ResDto<boolean>> {
  let response = ResDto.Default<boolean>();

  try {
    let avalibile = false;

    // check length
    if (channelCode.length > 5) {
      // check avalibility
      const aval = await ChannelController.checkChannelAval({
        data: { channelCode },
      });
      avalibile = aval;
    }

    if (avalibile) {
      response = ResDto.Success("Channel code avalible", avalibile);
    } else {
      response = ResDto.Fail("Channel code not avaliable", avalibile);
    }
  } catch (error) {
    console.error("Error: checking channel code avalbility: ", error);
    response = ResDto.Fail("Server Error");
  }

  return response;
}
