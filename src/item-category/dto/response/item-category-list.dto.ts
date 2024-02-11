import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ItemCategoryDto } from "./item-category.dto";

export class ItemCategoryListDto {
  @ApiProperty({
    description: "카테고리 총 개수",
  })
  @Expose()
  totalCount: number;

  @ApiProperty({
    description: "카테고리 정보",
    type: [ItemCategoryDto],
  })
  @Type(() => ItemCategoryDto)
  @Expose()
  nodes: ItemCategoryDto[];
}
