import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
  @ApiProperty({
    description: "상품명",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "시작일",
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: "유효기간",
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: "콘텐츠",
    nullable: true,
    type: Number,
  })
  @IsNumber()
  contentId: number | null;

  @ApiProperty({
    description: "메모",
    nullable: true,
    type: String,
  })
  @IsString()
  comment: string | null;

  @ApiProperty({
    description: "반복주기",
    nullable: true,
    type: Number,
  })
  @IsString()
  interval: number | null;
}
