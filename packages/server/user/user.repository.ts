import { AppRepository } from '../app.repository';
import { UserEntity } from './user.entity';

import { nanoid } from 'nanoid';

export class UserRepository extends AppRepository<UserEntity> {
  constructor() {
    super('./database/user.db');
  }

  async login({
    email,
    password,
  }: Pick<UserEntity, 'email' | 'password'>): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      this.nedb.find(
        { email, password },
        (error: unknown, docs: PromiseLike<never>) => {
          if (error) {
            reject(error);
          }
          resolve(docs);
        },
      );
    });
  }

  async bookmarkList({ _id }: UserEntity) {
    return new Promise((resolve, reject) => {
      this.nedb.find({ _id }, (error, docs) => {
        if (error) {
          reject(error);
        }
        resolve(docs[0].bookmark || []);
      });
    });
  }

  async addLibrary({ _id }: UserEntity, url: string): Promise<UserEntity> {
    const data = { _id: nanoid(), url };
    return new Promise((resolve, reject) => {
      this.nedb.update({ _id }, { $push: { bookmark: data } }, (error, doc) => {
        if (error) {
          reject(error);
        }

        resolve(doc);
      });
    });
  }

  async removeLibrary({ _id }: UserEntity, libraryId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.nedb.update(
        { _id },
        { $pull: { bookmark: { url: libraryId } } },
        (error, doc) => {
          if (error) {
            reject(error);
          }
          resolve(doc);
        },
      );
    });
  }
}
