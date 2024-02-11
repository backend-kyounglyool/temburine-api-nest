import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateItemCategoryDto {
  @ApiProperty({
    description: "카테고리 명",
  })
  @IsString()
  name: string;
}
