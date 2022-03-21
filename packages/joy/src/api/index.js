import request from './getData';

// 로그인
export async function login(data) {
  return request('/user/login', 'POST', data);
}

// 회원가입
export async function signup(data) {
  return request('/user', 'POST', data);
}

// 북마크한 게시물 조회
export async function getBookmarkList(data) {
  return request('/user/bookmark', 'POST', data);
}

// 게시물에 북마크 추가
export async function addBookmark({ _id, _key }) {
  return request(`/user/bookmark/${_key}`, 'POST', { _id });
}

// 게시물에 북마크 삭제
export async function removeBookmark({ _id, _key }) {
  return request(`/user/bookmark/${_key}`, 'DELETE', { _id });
}
