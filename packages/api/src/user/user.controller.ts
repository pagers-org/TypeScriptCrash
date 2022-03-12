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

  @Post(':url')
  async add(
    @Param('url') url: string,
    @Body() payload: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.add(payload, url);
  }

  @Delete(':id')
  async remove(
    @Param('id') libraryId: string,
    @Body() payload: UserEntity,
  ): Promise<number> {
    return this.userService.remove(payload, libraryId);
  }
}
