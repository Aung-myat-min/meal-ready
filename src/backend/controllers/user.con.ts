import { MUser } from "@/generated/prisma";
import prisma from "../lib/main_prisma";

export class UserController {
  async create({
    data,
  }: {
    data: { userName: string; userEmail: string };
  }): Promise<MUser> {
    const newMUser = await prisma.mUser.create({
      data: {
        userName: data.userName,
        userEmail: data.userEmail,
      },
    });

    return newMUser;
  }

  async getOne({ data }: { data: { userId: string } }): Promise<MUser | null> {
    const user = await prisma.mUser.findUnique({
      where: { userId: data.userId },
    });

    return user ?? null;
  }

  async updateOne({ data }: { data: MUser }): Promise<MUser> {
    const updatedUser = await prisma.mUser.update({
      where: { userId: data.userId },
      data: data,
    });

    return updatedUser;
  }

  async deleteOne({ data }: { data: { userId: string } }): Promise<void> {
    await prisma.mUser.delete({ where: { userId: data.userId } });
  }
}
