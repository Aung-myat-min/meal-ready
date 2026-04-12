import { MealStatus, Prisma } from "@prisma/client";

export type MJWTPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

export enum OperationStatus {
  default,
  success,
  fail,
  notfound,
}

export type HomeReturn = {
  user: {
    name: string;
    email: string;
  };
  channel: {
    channelId: string | null;
    channelName: string | null;
  };
  status: {
    status: MealStatus;
    updatedName: string;
  };
  subscribtors: string[];
};

export type ChannelWithRelations = Prisma.ChannelGetPayload<{
  select: {
    associatedStatus: true;
    associatedSub: true;
  };
}>;
