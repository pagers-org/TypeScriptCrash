import { BASE_URL } from '../constants';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 */
export default class Client {
  constructor({ baseURL = BASE_URL, config }) {
    this.baseURL = baseURL;
    this.config = {
      mode: 'same-origin', // no-cors, cors, *same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrer: 'client', // no-referrer, *client
      ...config,
    };
  }

  getImage(num) {
    return fetch(`${this.baseURL}/${num}.jpg`);
  }

  async request({ url, body = {}, headers, method, init = false }) {
    const config = {
      ...this.config,
      method,
      headers: new Headers(headers),
      body: JSON.stringify(body),
    };

    // 여기 에러 캐치는 request-response를 잡는 것
    try {
      const response = await fetch(
        `${this.baseURL}${url}`,
        init ? this.config : config,
      );
      return await this.parse(response);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  /**
   * @TODO: fetch API 404 에러를 던지지 않으니까 먼저 체크해줘야 됨
   * @see https://stackoverflow.com/questions/44019776/fetch-api-chrome-and-404-errors
   * @see https://stackoverflow.com/questions/69874045/fetch-api-then-functions-runs-even-if-response-ok-is-false
   *
   * @param {*} response
   */
  async parse(response) {
    // 여기는 의도적으로 낼 수 있는 에러
    const { ok: isValidResponse, status } = response;
    try {
      if (!isValidResponse) throw new Error('invalid response');
      const data = status !== 204 ? await response.json() : null;
      return data;
    } catch (error) {
      console.error(error);
      return { status };
    }
  }
}
