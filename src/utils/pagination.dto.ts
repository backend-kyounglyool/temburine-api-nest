import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class PaginationDto {
  @ApiProperty({
    description: "페이지 수",
  })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: "페이지 사이즈",
  })
  @Type(() => Number)
  pageSize: number;
}
