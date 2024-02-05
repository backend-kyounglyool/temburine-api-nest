import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { Expose, Type } from 'class-transformer';

export class LoginResponseDto {
  @ApiProperty({
    description: '유저 정보',
  })
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({
    description: 'token',
  })
  @Expose()
  token: string;
}
