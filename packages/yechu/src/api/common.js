const BASE_URL = 'http://localhost:3000/api';

export async function parseData(resource, data) {

  const response = await fetch(BASE_URL + resource, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify(data),
  });

  console.log(response, resource, data)
  return response.json();
};