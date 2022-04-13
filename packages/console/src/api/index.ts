import { BASE_URL } from '../utils/constants';
interface ConfigInterface {
  method: string;
  headers: Headers;
  body?: string;
}
export const fetchData = async <T>(
  fetchApi = '',
  url: string,
  data: T,
  method = 'POST',
) => {
  try {
    const config = {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
    } as ConfigInterface;
    if (data) config.body = JSON.stringify(data);
    const response = await fetch(`${BASE_URL}${url}`, config);
    const parse = response.json();
    return parse;
  } catch (err) {
    console.log(`${fetchApi}${err}`);
  }
};
