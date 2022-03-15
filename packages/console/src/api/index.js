import { instance } from './http';

const fetchFn = async (url, data, method) => {
  try {
    const response = await fetch(url, instance(method, data));
    const parse = await response.json();
    return parse;
  } catch (err) {
    console.log(err);
  }
};

export async function login(url, data) {
  return fetchFn(url, data, 'POST');
}

export async function signup(url, data) {
  return fetchFn(url, data, 'POST');
}

export async function getBookmarkList(url, data) {
  return fetchFn(url, data, 'POST');
}

export async function addBookmark(url, data) {
  return fetchFn(url, data, 'POST');
}

export async function removeBookmark(url, data) {
  return fetchFn(url, data, 'DELETE');
}
