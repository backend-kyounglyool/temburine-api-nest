import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AgreementModule } from './agreement/agreement.module';
import { ItemCategoryModule } from './item-category/item-category.module';
import { S3Module } from './s3/s3.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, HttpModule, JwtModule, AgreementModule, ItemCategoryModule, S3Module, ContentModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
