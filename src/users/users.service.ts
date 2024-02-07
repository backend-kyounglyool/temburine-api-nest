import { Injectable } from "@nestjs/common";
import { AuthType, Prisma, User } from "@prisma/client";
import { create } from "domain";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateUser(authType: AuthType, authId: string): Promise<User> {
    return this.prisma.user.upsert({
      where: {
        authId,
        authType,
      },
      update: {},
      create: {
        authType,
        authId,
      },
    });
  }

  async findUserById(userId: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }
}
