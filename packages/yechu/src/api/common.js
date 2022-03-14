const config = {
  method: 'POST',
  headers: new Headers({ 'content-type': 'application/json' }),
};

export async function parseData(url, data) {
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
};