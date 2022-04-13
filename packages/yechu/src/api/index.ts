import { BookmarkDataType, LoginDataType } from 'Fox';
import { fetchData } from './common';

export async function getBookmarkList(url: string, data: BookmarkDataType) {
  return await fetchData(url, data, 'POST');
}

export async function addBookmark(url: string, data: BookmarkDataType) {
  return await fetchData(url, data, 'POST');
}

export async function removeBookmark(url: string, data: BookmarkDataType) {
  return await fetchData(url, data, 'DELETE');
}

export async function login(url: string, data: LoginDataType) {
  return await fetchData(url, data, 'POST');
}

export async function signup(url: string, data: LoginDataType) {
  return await fetchData(url, data, 'POST');
}
