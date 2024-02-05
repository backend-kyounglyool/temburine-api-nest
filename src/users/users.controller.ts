import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { type } from 'os';
import { UserDto } from 'src/auth/dto/response/user.dto';
import { UserJwtGuard } from 'src/auth/guard/user-jwt.guard';
import { CurrentUser } from 'src/utils/decorator/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor() {}

  @ApiOperation({
    description: '내 정보 반환 API',
  })
  @ApiOkResponse({
    description: '내 정보 반환 성공!',
    type: UserDto,
  })
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth('auth-user')
  @Get('me')
  getMyUserProfile(@CurrentUser() user: User) {
    return user;
  }
}
