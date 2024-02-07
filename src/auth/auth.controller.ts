import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { KakaoAuthGuard } from "./guard/kakao.guard";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/response/user.dto";
import { CurrentUser } from "../utils/decorator/current-user.decorator";
import { AuthenticateWithKakaoDto } from "./dto/request/authenticate-with-kakao.dto";
import { LoginResponseDto } from "./dto/response/login-response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService
  ) {}
  private API_BASE_URL = this.configService.get("API_BASE_URL");

  @Get("login/kakao")
  @ApiOperation({
    summary: "카카오 로그인",
  })
  @UseGuards(KakaoAuthGuard)
  getKakao() {
    return {
      url: `${this.API_BASE_URL}/login/kakao/callback`,
      statusCode: 301,
    };
  }

  @ApiExcludeEndpoint()
  @Get("login/kakao/callback")
  @ApiOperation({
    summary: "카카오 로그인 callback",
  })
  @UseGuards(KakaoAuthGuard)
  getKakaoCallback(@CurrentUser() user: User): Promise<UserDto | null> {
    return this.authService.getUserDto(user);
  }

  @ApiOperation({
    summary: "카카오 로그인",
  })
  @ApiOkResponse({
    description: "유저 로그인 성공",
    type: LoginResponseDto,
  })
  @Post("authenticate/kakao")
  authenticateWithKakao(@Body() dto: AuthenticateWithKakaoDto) {
    const { accessKey } = dto;
    return this.authService.authenticateWithKakao(accessKey);
  }
}
