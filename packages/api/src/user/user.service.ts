import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends AppService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  async add(payload: UserEntity, url: string): Promise<UserEntity> {
    return this.userRepository.addLibrary(payload, url);
  }

  async remove(payload: UserEntity, libraryId: string): Promise<number> {
    return this.userRepository.removeLibrary(payload, libraryId);
  }
}
