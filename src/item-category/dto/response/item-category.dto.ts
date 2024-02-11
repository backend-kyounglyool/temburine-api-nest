import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ItemCategoryDto {
  @ApiProperty({
    description: "카테고리 ID",
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: "유저 ID",
  })
  @Expose()
  userId: number;

  @ApiProperty({
    description: "카테고리 명",
  })
  @Expose()
  categoryName: string;

  @ApiProperty({
    description: "생성일",
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: "수정일",
  })
  @Expose()
  updatedAt: Date;
}
