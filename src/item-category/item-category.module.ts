import { Module } from "@nestjs/common";
import { ItemCategoryController } from "./item-category.controller";
import { ItemCategoryService } from "./item-category.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ItemCategoryController],
  providers: [ItemCategoryService],
})
export class ItemCategoryModule {}
