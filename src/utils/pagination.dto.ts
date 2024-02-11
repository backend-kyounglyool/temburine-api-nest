import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class PagenationDto {
  @ApiProperty({
    description: "페이지 수",
  })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: "페이지 사이즈",
  })
  @IsNumber()
  @Type(() => Number)
  pageSize: number;
}
