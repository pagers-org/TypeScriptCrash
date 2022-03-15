import { BASE_URL } from '../utils/constants';

const fetchFn = async (url, data, method) => {
  try {
    const config = {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
    };
    if (data) config.body = JSON.stringify(data);
    const response = await fetch(`${BASE_URL}${url}`, config);
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
