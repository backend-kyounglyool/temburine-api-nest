import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthenticateWithKakaoDto {
  @ApiProperty({
    description: 'kakao access key',
  })
  @IsString()
  accessKey: string;
}
