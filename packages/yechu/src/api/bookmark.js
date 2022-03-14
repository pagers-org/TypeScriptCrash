import { parseData } from './common';

export async function getBookmarkList(url, data) {
  return await parseData(url, data);
}

export async function addBookmark(url, data) {
  return await parseData(url, data);
}

export async function removeBookmark(url, data) {
  return await parseData(url, data);
} 
