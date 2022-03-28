type HttpRequestArgs = {
  url: string;
  config?: RequestInit;
  data?: object;
};

export class HttpClient {
  private readonly baseUrl: string;

  constructor({ baseUrl = '' } = {}) {
    this.baseUrl = baseUrl;
  }

  async request({ url, config }: HttpRequestArgs) {
    config = {
      ...{ headers: new Headers({ 'content-type': 'application/json' }) },
      ...config,
    };

    const callUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;

    try {
      const response = await fetch(callUrl, config);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  get({ url }: HttpRequestArgs) {
    return this.request({
      url,
      config: { method: 'GET' },
    });
  }

  post({ url, data = {} }: HttpRequestArgs) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: { body, method: 'POST' },
    });
  }

  delete({ url, data = {} }: HttpRequestArgs) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: { body, method: 'DELETE' },
    });
  }
}
