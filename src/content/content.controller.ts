import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { ContentDto } from "./dto/response/content.dto";
import { ContentRequestDto } from "./dto/request/content-request.dto";
import { ContentUploadResponseDto } from "./dto/response/content-upload-response.dto";
import { ContentService } from "./content.service";
import { Response } from "express";
import { CurrentUser } from "../utils/decorator/current-user.decorator";
import { User } from "@prisma/client";
import { UserJwtGuard } from "../auth/guard/user-jwt.guard";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post("prepare-upload")
  @ApiOperation({
    summary: "컨텐츠 업로드",
    description: "컨텐츠를 업로드하는 url 발급합니다.",
  })
  @ApiResponse({
    description: "컨텐츠 업로드 url 발급 성공",
    type: ContentUploadResponseDto,
  })
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth("auth-user")
  @SerializeOptions({ type: ContentUploadResponseDto })
  async createContent(
    @CurrentUser() user: User,
    @Body() contentDto: ContentRequestDto
  ): Promise<ContentUploadResponseDto> {
    return this.contentService.getContentUploadUrl(contentDto, user.id);
  }

  @Post("complete-upload/:contentId")
  @ApiOperation({
    summary: "컨텐츠 업로드 상태 업데이트",
    description:
      "컨텐츠 업로드 후, 성공적으로 업로드 했음을 서버에 전달하기 위한 콜백",
  })
  @ApiResponse({
    description: "컨텐츠 업로드 상태 변경 성공",
    type: ContentDto,
  })
  @SerializeOptions({ type: ContentDto })
  async updateContentUploadStatus(
    @Param("contentId") contentId: number
  ): Promise<ContentDto> {
    return this.contentService.updateContentUploadStatus(contentId);
  }

  @ApiExcludeEndpoint()
  @Get(":contentId")
  @ApiOperation({
    summary: "컨텐츠 조회",
    description:
      "컨텐츠를 조회합니다. 해당 API는 이미지 url로 리다이렉트합니다.",
  })
  @ApiResponse({
    status: 307,
    description: "컨텐츠 조회 성공",
  })
  async getContentsUrl(
    @Param("contentId") contentId: number,
    @Res() res: Response
  ) {
    const url = await this.contentService.getContentViewUrl(contentId);

    res.redirect(307, url);
  }
}
