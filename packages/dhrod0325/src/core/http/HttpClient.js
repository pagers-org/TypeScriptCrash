export class HttpClient {
  baseUrl;

  constructor({ baseUrl = '' } = {}) {
    this.baseUrl = baseUrl;
  }

  async request({ url, config }) {
    config = {
      ...{
        headers: new Headers({ 'content-type': 'application/json' }),
      },
      ...config,
    };

    const callUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    const response = await fetch(callUrl, config);

    return await response.json();
  }

  get({ url }) {
    return this.request({
      url,
      config: {
        method: 'GET',
      },
    });
  }

  post({ url, data = {} }) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: {
        body,
        method: 'POST',
      },
    });
  }

  delete({ url, data = {} }) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: {
        body,
        method: 'DELETE',
      },
    });
  }
}
