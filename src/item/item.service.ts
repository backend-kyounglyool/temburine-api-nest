import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/request/create-item.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Item } from "@prisma/client";
import { ContentService } from "../content/content.service";

@Injectable()
export class ItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentService: ContentService
  ) {}

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

  async getItems(
    userId: number,
    itemCategoryId: number,
    page: number,
    pageSize: number
  ) {
    const items = await this.prisma.item.findMany({
      where: {
        userId,
        itemCategoryId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return items.map((item) => {
      return {
        ...item,
        url: item.contentId ? this.contentService.getUrl(item.contentId) : null,
      };
    });
  }
}
