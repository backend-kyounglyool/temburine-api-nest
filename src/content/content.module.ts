import { Module } from "@nestjs/common";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { PrismaModule } from "../prisma/prisma.module";
import { S3Module } from "../s3/s3.module";

@Module({
  imports: [PrismaModule, S3Module],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
