import { HTTP_METHODS, IMAGE_API_URL } from '../constants';
import client from './config';

export const signup = async <T>(body: { [key: string]: string }) => {
  const response = await client.request<T>({
    method: HTTP_METHODS.POST,
    url: '/api/user',
    body,
  });

  return response;
};

export const login = async <T>(body: { [key: string]: string }) => {
  const response = await client.request<T>({
    method: HTTP_METHODS.POST,
    url: '/api/user/login',
    body,
  });

  return response;
};

export const getBookmarkList = async <T>(body: { _id: string }) => {
  const response = await client.request<T>({
    method: HTTP_METHODS.POST,
    url: '/api/user/bookmark',
    body,
  });

  return response;
};

export const setBookmark = async <T>(
  key: string,
  body: { [key: string]: string },
) => {
  const response = client.request<T>({
    method: HTTP_METHODS.POST,
    url: `/api/user/bookmark/${key}`,
    body,
  });

  return response;
};

export const getFoxImages = async (foxNumber: number) => {
  return fetch(`${IMAGE_API_URL}/${foxNumber}.jpg`);
};
