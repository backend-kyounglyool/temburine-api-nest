import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateItemDto } from "./dto/request/create-item.dto";
import { CurrentUser } from "../utils/decorator/current-user.decorator";
import { Item, User } from "@prisma/client";
import { UserJwtGuard } from "../auth/guard/user-jwt.guard";
import { PaginationDto } from "../utils/pagination.dto";

@Controller()
@ApiTags("Item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({
    summary: "아이템 등록 API",
    description: "아이템을 등록합니다",
  })
  @ApiBearerAuth("auth-user")
  @UseGuards(UserJwtGuard)
  @SerializeOptions({ strategy: "exposeAll" })
  @Post("users/me/item-category/:itemCategoryId/item")
  createItem(
    @CurrentUser() user: User,
    @Param("itemCategoryId") itemCategoryId: number,
    @Body() dto: CreateItemDto
  ): Promise<Item> {
    return this.itemService.createItem(user.id, itemCategoryId, dto);
  }

  @ApiOperation({
    summary: "아이템 조회 API",
    description: "아이템을 조회합니다",
  })
  @ApiBearerAuth("auth-user")
  @UseGuards(UserJwtGuard)
  @SerializeOptions({ strategy: "exposeAll" })
  @Get("users/me/item-category/:itemCategoryId/items")
  getItems(
    @CurrentUser() user: User,
    @Param("itemCategoryId") itemCategoryId: number,
    @Query() dto: PaginationDto
  ): Promise<Item[]> {
    const { page, pageSize } = dto;
    return this.itemService.getItems(user.id, itemCategoryId, page, pageSize);
  }
}
