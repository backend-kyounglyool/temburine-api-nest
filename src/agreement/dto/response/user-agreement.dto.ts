import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserAgreementDto {
  @ApiProperty({
    description: "이용정보 ID",
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: "유저 ID",
  })
  @Expose()
  userId: number;

  @ApiProperty({
    description: "반복알림 동의 여부",
  })
  @Expose()
  isAgreeIntervalNotification: boolean;

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
