import { BASE_URL } from '../utils/constants';

export const fetchData = async (fetchApi = '', url, data, method = 'POST') => {
  try {
    const config = {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
    };
    if (data) config.body = JSON.stringify(data);
    const response = await fetch(`${BASE_URL}${url}`, config);
    const parse = response.json();
    return parse;
  } catch (err) {
    console.log(`${fetchApi}${err}`);
  }
};
