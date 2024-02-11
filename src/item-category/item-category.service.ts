import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ItemCategoryDto } from "./dto/response/item-category.dto";
import { ItemCategoryListDto } from "./dto/response/item-category-list.dto";

@Injectable()
export class ItemCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createItemCategory(
    userId: number,
    categoryName: string
  ): Promise<ItemCategoryDto> {
    return this.prisma.itemCategory.create({
      data: {
        userId,
        categoryName,
      },
    });
  }

  async getItemCategories(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<ItemCategoryListDto> {
    const [totalCount, nodes] = await Promise.all([
      this.prisma.itemCategory.count({
        where: {
          userId,
        },
      }),

      this.prisma.itemCategory.findMany({
        where: {
          userId,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
    ]);

    return {
      totalCount,
      nodes,
    };
  }
}
