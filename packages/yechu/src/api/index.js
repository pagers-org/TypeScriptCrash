import { fetchData } from './common';

export async function getBookmarkList(resource, data) {
  return await fetchData(resource, data, 'POST');
}

export async function addBookmark(resource, data) {
  return await fetchData(resource, data, 'POST');
}
//추후
export async function removeBookmark(resource, data) {
  return await fetchData(resource, data, 'DELETE');
}

export async function login(resource, data) {
  return await fetchData(resource, data, 'POST');
}

export async function signup(resource, data) {
  return await fetchData(resource, data, 'POST');
}
