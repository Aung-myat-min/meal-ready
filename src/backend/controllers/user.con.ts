import { MUser } from "@prisma/client";
import prisma from "../lib/main_prisma";

export class UserController {
  static async create({
    data,
  }: {
    data: { userName: string; userEmail: string; hashedPass: string };
  }): Promise<MUser> {
    const newMUser = await prisma.mUser.create({
      data: {
        userName: data.userName,
        userEmail: data.userEmail,
        password: data.hashedPass,
      },
    });

    return newMUser;
  }

  static async getUserNameBySubCode({
    data,
  }: {
    data: { subCode: string };
  }): Promise<string[]> {
    let names: string[] = [];

    const n = await prisma.mUser.findMany({
      where: {
        subscriptionCode: data.subCode,
      },
      select: {
        userName: true,
      },
    });

    names = n.map((n) => n.userName);

    return names;
  }

  static async getOne({
    data,
  }: {
    data: { userId: string };
  }): Promise<Omit<MUser, "password"> | null> {
    const user = await prisma.mUser.findUnique({
      where: { userId: data.userId },
      omit: { password: true },
    });

    return user ?? null;
  }

  static async addSub({
    data,
  }: {
    data: { userId: string; subscriptionCode: string };
  }): Promise<boolean> {
    try {
      await prisma.mUser.update({
        where: { userId: data.userId },
        data: { subscriptionCode: data.subscriptionCode },
      });
      return true;
    } catch (error) {
      console.error("Error: connnecting user to the sub", error);
      return false;
    }
  }

  static async getOneWithEmail({
    data,
  }: {
    data: { userEmail: string };
  }): Promise<MUser | null> {
    const user = await prisma.mUser.findUnique({
      where: { userEmail: data.userEmail },
    });

    return user ?? null;
  }

  static async updateOne({ data }: { data: MUser }): Promise<MUser> {
    const updatedUser = await prisma.mUser.update({
      where: { userId: data.userId },
      data: data,
    });

    return updatedUser;
  }

  static async deleteOne({
    data,
  }: {
    data: { userId: string };
  }): Promise<void> {
    await prisma.mUser.delete({ where: { userId: data.userId } });
  }
}
