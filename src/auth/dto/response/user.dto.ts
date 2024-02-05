import { ApiProperty } from '@nestjs/swagger';
import { AuthType } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'id',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '계정 타입',
    enum: AuthType,
  })
  @Expose()
  authType: AuthType;

  @ApiProperty({
    description: '계정 ID',
    type: String,
    nullable: true,
  })
  @Expose()
  authId: string | null;

  @ApiProperty({
    description: '생성일',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: '탈퇴일',
    nullable: true,
    type: Date,
  })
  @Expose()
  deletedAt: Date | null;
}
