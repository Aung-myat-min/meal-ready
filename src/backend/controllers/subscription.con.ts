import { Subscription } from "@prisma/client";
import prisma from "../lib/main_prisma";

export class SubscriptionController {
  static async create({
    data,
  }: {
    data: { channelId: string };
  }): Promise<Subscription> {
    const newSubscription = await prisma.subscription.create({
      data: {
        channelId: data.channelId,
      },
    });

    return newSubscription;
  }

  static async getOne({
    data,
  }: {
    data: { subscriptionCode: string };
  }): Promise<Subscription | null> {
    const subscription = await prisma.subscription.findUnique({
      where: { subscriptionCode: data.subscriptionCode },
    });

    return subscription ?? null;
  }

  static async getSubByUserId({ data }: { data: { userId: string } }) {
    const subscription = await prisma.mUser.findFirst({
      where: { userId: data.userId },
      select: {
        subscription: true,
      },
    });

    return subscription;
  }

  static async updateOne({
    data,
  }: {
    data: Subscription;
  }): Promise<Subscription> {
    const updatedSubscription = await prisma.subscription.update({
      where: { subscriptionCode: data.subscriptionCode },
      data: data,
    });

    return updatedSubscription;
  }

  static async deleteOne({
    data,
  }: {
    data: { subscriptionCode: string };
  }): Promise<void> {
    await prisma.subscription.delete({
      where: { subscriptionCode: data.subscriptionCode },
    });
  }
}
