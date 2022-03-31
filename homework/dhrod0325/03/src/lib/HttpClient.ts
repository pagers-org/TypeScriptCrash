import { Client, ClientInit } from 'covid';

export class HttpClient implements Client {
  private readonly baseUrl: string;

  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async request({ url, config }: ClientInit) {
    config = {
      ...{ headers: new Headers({ 'content-type': 'application/json' }) },
      ...config,
    };

    const targetUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;

    try {
      const response = await fetch(targetUrl, config);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  get({ url }: ClientInit) {
    return this.request({
      url,
      config: { method: 'GET' },
    });
  }

  post({ url, data = {} }: ClientInit) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: { body, method: 'POST' },
    });
  }

  delete({ url, data = {} }: ClientInit) {
    const body = JSON.stringify(data);

    return this.request({
      url,
      config: { body, method: 'DELETE' },
    });
  }

  put({ url, data }: ClientInit): any {
    return null;
  }
}
