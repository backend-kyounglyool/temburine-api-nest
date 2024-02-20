import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/request/create-item.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Item } from "@prisma/client";

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  createItem(
    userId: number,
    itemCategoryId: number,
    dto: CreateItemDto
  ): Promise<Item> {
    return this.prisma.item.create({
      data: {
        userId,
        itemCategoryId,
        ...dto,
      },
    });
  }

  getItems(
    userId: number,
    itemCategoryId: number,
    page: number,
    pageSize: number
  ) {
    return this.prisma.item.findMany({
      where: {
        userId,
        itemCategoryId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}
