import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Agreement } from "@prisma/client";
import { UserAgreementDto } from "./dto/response/user-agreement.dto";

@Injectable()
export class AgreementService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserAgreement(
    userId: number,
    isAgreeIntervalNotification: boolean
  ): Promise<UserAgreementDto> {
    return this.prisma.agreement.create({
      data: {
        userId: userId,
        isAgreeIntervalNotification,
      },
    });
  }

  async updateUserAgreement(
    userId: number,
    isAgreeIntervalNotification: boolean
  ): Promise<UserAgreementDto> {
    return this.prisma.agreement.upsert({
      where: {
        userId,
      },
      update: {
        isAgreeIntervalNotification,
      },
      create: {
        userId: userId,
        isAgreeIntervalNotification,
      },
    });
  }
}
