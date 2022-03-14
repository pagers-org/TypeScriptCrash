import { parseData } from './common';

export async function getBookmarkList(url, data) {
  await parseData(url, data);
}

export async function addBookmark(url, data) {
  await parseData(url, data);
}

export async function removeBookmark(url, data) {
  await parseData(url, data);
}
