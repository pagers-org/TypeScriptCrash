const BASE_URL = 'http://localhost:3000/api';

export default async function getData(url, method, data) {
  const config = {
    method: method,
    headers: new Headers({ 'content-type': 'application/json' }),
  };
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(BASE_URL + url, config);
  const parse = await response.json();
  return parse;
}
