import { Api } from '../constatnt';

export async function fetchData<T>(
  url: string,
  data: T,
  method: string,
): Promise<T> {
  try {
    const response = await fetch(Api.BASE_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data && JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    throw e;
  }
}
