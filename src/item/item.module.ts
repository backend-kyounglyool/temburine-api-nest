import { Module } from "@nestjs/common";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ContentModule } from "../content/content.module";

@Module({
  imports: [PrismaModule, ContentModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
