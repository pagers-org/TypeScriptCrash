import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AppController } from '../app.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends AppController<UserEntity> {
  constructor(private readonly userService: UserService) {
    super(userService);
    this.userService = userService;
  }

  @Post('login')
  async findUser(
    @Body() payload: Pick<UserEntity, 'email' | 'password'>,
  ): Promise<UserEntity> {
    return this.userService.findUser(payload);
  }

  @Post('bookmark')
  async findBookmark(@Body() payload: UserEntity) {
    return this.userService.findBookmark(payload);
  }

  @Post('bookmark/:url')
  async add(
    @Param('url') url: string,
    @Body() payload: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.add(payload, url);
  }

  @Delete('bookmark/:id')
  async remove(
    @Param('id') libraryId: string,
    @Body() payload: UserEntity,
  ): Promise<number> {
    return this.userService.remove(payload, libraryId);
  }
}
