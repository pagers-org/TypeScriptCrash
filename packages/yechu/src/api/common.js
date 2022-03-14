export async function parseData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data && JSON.stringify(data),
  });
  const parse = await response.json();
  return parse;
};