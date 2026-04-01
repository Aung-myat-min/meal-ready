import { CurrentStatus } from "@prisma/client";
import prisma from "../lib/main_prisma";

export class CurrentStatusController {
  static async create({
    data,
  }: {
    data: { channelId: string };
  }): Promise<CurrentStatus> {
    const newCurrentStatus = await prisma.currentStatus.create({
      data: {
        channelId: data.channelId,
      },
    });

    return newCurrentStatus;
  }

  static async getOne({
    data,
  }: {
    data: { statusId: string };
  }): Promise<CurrentStatus | null> {
    const status = await prisma.currentStatus.findUnique({
      where: { statusId: data.statusId },
    });

    return status ?? null;
  }

  static async updateOne({
    data,
  }: {
    data: CurrentStatus;
  }): Promise<CurrentStatus> {
    const updatedStatus = await prisma.currentStatus.update({
      where: { statusId: data.statusId },
      data: data,
    });

    return updatedStatus;
  }

  static async deleteOne({
    data,
  }: {
    data: { statusId: string };
  }): Promise<void> {
    await prisma.currentStatus.delete({ where: { statusId: data.statusId } });
  }
}
