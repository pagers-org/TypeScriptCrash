import { REGEXP_EMAIL } from '../constants';

export const isEmpty = (data: any) => {
  if (data === undefined) return true;
  if (data instanceof Array) return data.length === 0;
  if (data instanceof Set || data instanceof Map) return data.size === 0;
  if (data.constructor === Object) return Object.keys(data).length === 0;
  if (typeof data === 'string') return data === '';
  if (typeof data === 'number') return data === 0;

  return false;
};

export const isValidEmail = (email: string): boolean =>
  REGEXP_EMAIL.test(email);

export const createUUID = () => {
  let present = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const randomNumber = (present + Math.random() * 16) % 16 | 0;
    present = Math.floor(present / 16);
    return (
      callback == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8
    ).toString(16);
  });
};
