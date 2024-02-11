import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserJwtGuard } from "../auth/guard/user-jwt.guard";
import { CurrentUser } from "../utils/decorator/current-user.decorator";
import { Agreement, User } from "@prisma/client";
import { CreateUserAgreementDto } from "./dto/request/create-user-agreement.dto";
import { AgreementService } from "./agreement.service";
import { UserAgreementDto } from "./dto/response/user-agreement.dto";
import { UpdateUserAgreement } from "./dto/request/update-user-agreement.dto";

@ApiTags("Agreement")
@Controller()
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @ApiOperation({
    summary: "사용자 이용정보 저장 API",
    description: "사용자의 이용정보를 저장합니다.",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserAgreementDto,
  })
  @ApiBearerAuth("auth-user")
  @SerializeOptions({ type: UserAgreementDto })
  @Post("users/me/agreement")
  @UseGuards(UserJwtGuard)
  createUserAgreement(
    @CurrentUser() user: User,
    @Body() dto: CreateUserAgreementDto
  ): Promise<UserAgreementDto> {
    const { isAgreeIntervalNotification } = dto;
    return this.agreementService.createUserAgreement(
      user.id,
      isAgreeIntervalNotification
    );
  }

  @ApiOperation({
    summary: "사용자 이용정보 수정 API",
    description: "사용자의 이용정보를 수정합니다.",
  })
  @ApiResponse({
    status: 204,
    type: UserAgreementDto,
  })
  @ApiBearerAuth("auth-user")
  @SerializeOptions({ type: UserAgreementDto })
  @Patch("users/me/agreement")
  @UseGuards(UserJwtGuard)
  updateUserAgreement(
    @CurrentUser() user: User,
    @Body() dto: UpdateUserAgreement
  ): Promise<UserAgreementDto> {
    const { isAgreeIntervalNotification } = dto;
    return this.agreementService.updateUserAgreement(
      user.id,
      isAgreeIntervalNotification
    );
  }
}
