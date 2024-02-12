import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ContentDto {
  @ApiProperty({
    description: "콘텐츠 ID",
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: "파일명",
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: "파일명 타입",
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: "url",
  })
  @Expose()
  url: string;

  @ApiProperty({
    description: "생성일",
  })
  @Expose()
  createdAt: Date;
}
