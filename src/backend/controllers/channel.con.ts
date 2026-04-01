import { Channel, MealStatus } from "@/generated/prisma";
import prisma from "../lib/main_prisma";

export class ChannelController {
  static async create({
    data,
  }: {
    data: { channelName: string; channelCode: string; channelOwner: string };
  }): Promise<Channel> {
    const newChannel = await prisma.channel.create({
      data: {
        channelName: data.channelName,
        channelCode: data.channelCode,
        channelFounder: data.channelOwner,
      },
    });

    return newChannel;
  }

  static async getOne({
    data,
  }: {
    data: { channelId: string };
  }): Promise<Channel | null> {
    const channel = await prisma.channel.findUnique({
      where: { channelId: data.channelId },
    });

    return channel ?? null;
  }

  static async getStatus({
    data,
  }: {
    data: { channelId: string };
  }): Promise<MealStatus | null> {
    const currentStatus = await prisma.channel.findUnique({
      where: { channelId: data.channelId },
      select: {
        currentStatus: {
          select: {
            mealStatus: true,
          },
        },
      },
    });

    return currentStatus?.currentStatus?.mealStatus ?? null;
  }

  static async updateOne({ data }: { data: Channel }): Promise<Channel> {
    const updatedChannel = await prisma.channel.update({
      where: { channelId: data.channelId },
      data: data,
    });

    return updatedChannel;
  }

  static async deleteOne({
    data,
  }: {
    data: { channelId: string };
  }): Promise<void> {
    await prisma.channel.delete({ where: { channelId: data.channelId } });
  }
}
