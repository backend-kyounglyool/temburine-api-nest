import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from "@nestjs/common";
import { ItemCategoryService } from "./item-category.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserJwtGuard } from "../auth/guard/user-jwt.guard";
import { CurrentUser } from "../utils/decorator/current-user.decorator";
import { User } from "@prisma/client";
import { CreateItemCategoryDto } from "./dto/request/create-item-category.dto";
import { ItemCategoryDto } from "./dto/response/item-category.dto";
import { ItemCategoryListDto } from "./dto/response/item-category-list.dto";
import { PaginationDto } from "../utils/pagination.dto";

@Controller("item-category")
@ApiTags("Item-Category")
export class ItemCategoryController {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  @ApiOperation({
    summary: "아이템 카테고리 생성 API",
    description: "아이템 카테고리를 생성합니다.",
  })
  @ApiResponse({
    description: "아이템 카테고리 생성 성공",
    status: HttpStatus.CREATED,
    type: ItemCategoryDto,
  })
  @SerializeOptions({ type: ItemCategoryDto })
  @Post("users/me/item-category")
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth("auth-user")
  async createItemCategory(
    @CurrentUser() user: User,
    @Body() dto: CreateItemCategoryDto
  ): Promise<ItemCategoryDto> {
    const { name } = dto;
    return this.itemCategoryService.createItemCategory(user.id, name);
  }

  @ApiOperation({
    summary: "아이템 카테고리 조회 API",
    description: "아이템 카테고리를 조회합니다.",
  })
  @ApiResponse({
    description: "아이템 카테고리 조회 성공",
    status: HttpStatus.OK,
    type: ItemCategoryListDto,
  })
  @SerializeOptions({ type: ItemCategoryListDto })
  @Get("users/me/item-categories")
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth("auth-user")
  async getItemCategories(
    @CurrentUser() user: User,
    @Query() dto: PaginationDto
  ): Promise<ItemCategoryListDto> {
    const { page, pageSize } = dto;
    return this.itemCategoryService.getItemCategories(user.id, page, pageSize);
  }
}
