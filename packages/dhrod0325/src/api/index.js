import { CONFIG } from '../classes/common/Constant';

async function request(
  url,
  data = {},
  config = {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
  },
) {
  config.body = JSON.stringify(data);

  const response = await fetch(`${CONFIG.API_SERVER}${url}`, config);
  return await response.json();
}

export function login(data) {
  return request('/api/user/login', data);
}

export function signup(data) {
  return request('/api/user', data);
}

export function getBookmarkList({ _id }) {
  return request('/api/user/bookmark', { _id });
}

export function addBookmark({ key, _id }) {
  return request(`/api/user/bookmark/${key}`, { _id });
}

export function removeBookmark({ key, _id }) {
  return request(
    `/api/user/bookmark/${key}`,
    { _id },
    {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
    },
  );
}
