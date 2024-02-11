import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ItemCategoryDto } from "./dto/response/item-category.dto";

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
}
