import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { KakaoStrategy } from "./strategy/kakao.strategy";
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { UserJwtStrategy } from "./strategy/user-jwt.strategy";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [ConfigModule, UsersModule, HttpModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, UserJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
