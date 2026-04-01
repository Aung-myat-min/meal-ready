import { Subscription } from "@/generated/prisma";
import prisma from "../lib/main_prisma";

export class SubscriptionController {
  async create({
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

  async getOne({
    data,
  }: {
    data: { subscriptionCode: string };
  }): Promise<Subscription | null> {
    const subscription = await prisma.subscription.findUnique({
      where: { subscriptionCode: data.subscriptionCode },
    });

    return subscription ?? null;
  }

  async addSubscriptors({
    data,
  }: {
    data: { subscriptors: string[]; subscriptionCode: string };
  }): Promise<Subscription> {
    const updatedSubscription = await prisma.subscription.update({
      where: { subscriptionCode: data.subscriptionCode },
      data: {
        subscribers: {
          push: data.subscriptors,
        },
      },
    });

    return updatedSubscription;
  }

  async updateOne({ data }: { data: Subscription }): Promise<Subscription> {
    const updatedSubscription = await prisma.subscription.update({
      where: { subscriptionCode: data.subscriptionCode },
      data: data,
    });

    return updatedSubscription;
  }

  async deleteOne({
    data,
  }: {
    data: { subscriptionCode: string };
  }): Promise<void> {
    await prisma.subscription.delete({
      where: { subscriptionCode: data.subscriptionCode },
    });
  }
}
