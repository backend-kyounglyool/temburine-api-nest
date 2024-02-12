import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ContentRequestDto {
  @ApiProperty({
    description: "파일 이름",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "파일 타입",
  })
  @IsString()
  type: string;
}
