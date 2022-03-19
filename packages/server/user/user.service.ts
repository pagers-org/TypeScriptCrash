import { AppService } from '../app.service';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService extends AppService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
    this.userRepository = userRepository;
  }

  async findUser(
    payload: Pick<UserEntity, 'email' | 'password'>,
  ): Promise<UserEntity> {
    return this.userRepository.login(payload);
  }

  async findBookmark(payload: UserEntity) {
    return this.userRepository.bookmarkList(payload);
  }

  async add(payload: UserEntity, url: string): Promise<UserEntity> {
    return this.userRepository.addLibrary(payload, url);
  }

  async remove(payload: UserEntity, libraryId: string): Promise<number> {
    return this.userRepository.removeLibrary(payload, libraryId);
  }
}
