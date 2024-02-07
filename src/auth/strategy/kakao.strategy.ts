import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, StrategyOption } from "passport-kakao";
import { UsersService } from "../../users/users.service";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  public constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    const options: StrategyOption = {
      clientID: configService.getOrThrow("KAKAO_CLIENT_ID"),
      callbackURL: configService.getOrThrow("KAKAO_CALLBACK_URL"),
    };

    super(options);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id } = profile;
    const kakaoId = String(id);
    return this.usersService.findOrCreateUser("KAKAO", kakaoId);
  }
}
