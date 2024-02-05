import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService, ConfigService],
  exports: [PrismaService, ConfigService],
})
export class PrismaModule {}
