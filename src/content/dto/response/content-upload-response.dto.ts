import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ContentUploadResponseDto {
  @ApiProperty({
    description: "콘텐츠 ID",
  })
  @Expose()
  contentId: number;

  @ApiProperty({
    description: "이미지 업로드 url",
  })
  @Expose()
  signedUrl: string;
}
