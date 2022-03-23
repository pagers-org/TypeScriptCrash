import Nedb from 'nedb';
import { nanoid } from 'nanoid';

export class AppRepository<T> {
  protected readonly nedb;

  constructor(dbName: string) {
    this.nedb = new Nedb({
      filename: dbName,
      autoload: true,
      timestampData: true,
    });
  }

  async findAll(): Promise<Array<T>> {
    return this.find({});
  }

  async findById(_id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.find({ _id })
        .then(res => resolve(res[0]))
        .catch(error => reject(error));
    });
  }

  async find(options: unknown): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      this.nedb.find(options, (error: unknown, docs: PromiseLike<never>) => {
        if (error) {
          reject(error);
        }
        resolve(docs);
      });
    });
  }

  async insert(data: T): Promise<T> {
    const _id = nanoid();

    const generatedData = { ...data, _id };
    return new Promise((resolve, reject) => {
      this.nedb.insert(generatedData, (error, doc) => {
        if (error) {
          reject(error);
        }
        resolve(doc);
      });
    });
  }

  async deleteById(_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.nedb.remove({ _id }, (error, removedNum) => {
        if (error) {
          reject(error);
        }
        resolve(removedNum);
      });
    });
  }
}
