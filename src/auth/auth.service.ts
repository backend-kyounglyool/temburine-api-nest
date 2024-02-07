import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  private readonly secretKey = this.configService.get("SECRET_KEY");

  async getUserDto(user: User): Promise<User> {
    return user;
  }

  async authenticateWithKakao(accessToken: string) {
    const headersRequest = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await firstValueFrom(
      this.httpService.get("https://kapi.kakao.com/v2/user/me", {
        headers: headersRequest,
      })
    );

    const kakaoId = String(res.data.id);

    const user = await this.usersService.findOrCreateUser("KAKAO", kakaoId);

    const payload = { id: user.id };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.secretKey,
    });

    return {
      user,
      token,
    };
  }
}
