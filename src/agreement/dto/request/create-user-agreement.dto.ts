import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class CreateUserAgreementDto {
  @ApiProperty({
    description: "반복알림 동의여부",
  })
  @IsBoolean()
  isAgreeIntervalNotification: boolean;
}
