import { Module } from "@nestjs/common";
import { AgreementController } from "./agreement.controller";
import { AgreementService } from "./agreement.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AgreementController],
  providers: [AgreementService],
})
export class AgreementModule {}
