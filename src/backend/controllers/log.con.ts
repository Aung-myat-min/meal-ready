import { Log, LogEnum } from "@/generated/prisma";
import prisma from "../lib/main_prisma";

export class LogController {
  async create({
    data,
  }: {
    data: { logType: LogEnum; logString: string };
  }): Promise<Log> {
    const newLog = await prisma.log.create({
      data: {
        logString: data.logString,
        logType: data.logType,
      },
    });

    return newLog;
  }

  async getLogs({
    data,
  }: {
    data: { startDate?: Date; endDate?: Date; logType?: LogEnum };
  }): Promise<Log[]> {
    const logs = await prisma.log.findMany({
      where: {
        createdAt: {
          gte: data.startDate,
          lte: data.endDate,
          equals: data.logType,
        },
      },
    });

    return logs;
  }
}
