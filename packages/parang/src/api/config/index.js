import { BASE_URL, IMAGE_API_URL } from '../../constants';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 */
class Client {
  constructor() {
    this.config = {
      headers: new Headers({ 'content-type': 'application/json' }),
    };
  }

  getImage(num) {
    return fetch(`${IMAGE_API_URL}/${num}.jpg`);
  }

  async request({ url: apiPath, body, method }) {
    const requestURL = `${BASE_URL}${apiPath}`;
    const config = {
      ...this.config,
      method,
    };

    if (body) config.body = JSON.stringify(body);

    try {
      const response = await fetch(requestURL, config);
      return await this.parse(response);
    } catch (error) {
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
    const { ok: isValidResponse, status } = response;
    try {
      if (!isValidResponse) throw new Error('invalid response');
      const data = status !== 204 ? await response.json() : null;
      return data;
    } catch (error) {
      throw new Error('정보가 옳지 않습니다.');
    }
  }
}

export default new Client();
