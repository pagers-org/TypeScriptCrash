import { AppRepository } from './app.repository';

export class AppService<T> {
  constructor(private readonly appRepository: AppRepository<T>) {
    this.appRepository = appRepository;
  }

  async list(): Promise<Array<T>> {
    return this.appRepository.findAll();
  }

  async detail(_id: string): Promise<T> {
    return this.appRepository.findById(_id);
  }

  async save(data: T): Promise<T> {
    return this.appRepository.insert(data);
  }

  async delete(_id: string): Promise<number> {
    return this.appRepository.deleteById(_id);
  }
}
