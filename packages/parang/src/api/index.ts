import { HTTP_METHODS, IMAGE_API_URL } from '../constants';
import client from './config';

export const signup = async body => {
  const response = await client.request({
    method: HTTP_METHODS.POST,
    url: '/api/user',
    body,
  });

  return response;
};

export const login = async body => {
  const response = await client.request({
    method: HTTP_METHODS.POST,
    url: '/api/user/login',
    body,
  });

  return response;
};

export const getBookmarkList = async body => {
  const response = await client.request({
    method: HTTP_METHODS.POST,
    url: '/api/user/bookmark',
    body,
  });

  return response;
};

export const setBookmark = async (key, body) => {
  const response = client.request({
    method: HTTP_METHODS.POST,
    url: `/api/user/bookmark/${key}`,
    body,
  });

  return response;
};

export const getFoxImages = async foxNumber => {
  return fetch(`${IMAGE_API_URL}/${foxNumber}.jpg`);
};
