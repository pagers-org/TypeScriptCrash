export const API_URL = (() => {
  const BASE = 'https://api.covid19api.com';

  return {
    BASE,
    SUMMARY: `${BASE}/summary`,
    COUNTRY: `${BASE}/country`,
  };
})();

export const MSG = {
  MANY_DATA: '데이터가 많아 총괄 현황은 제공하지 않아요 😭',
  LOADING_COMPONENT: 'COMPONENT 가 로딩중입니다',
};
