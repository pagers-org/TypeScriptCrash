//한 개의 요소
export const $ = (selector) => document.querySelector(selector);
//버튼 타입별 요소
export const $btn_type = (type) => $(`button[data-submit="${type}"]`);

//여러 개의 요소
export const $all = (selector) => document.querySelectorAll(selector);

//로딩 이미지 생성
//토글이란 on/off의 스위치 개념. 현재는 loading이라는 클래스가 나타날 때까지 로딩 이미지가 생성됨.
export const toggleLoading = () => $('.loading').classList.toggle('hidden');
