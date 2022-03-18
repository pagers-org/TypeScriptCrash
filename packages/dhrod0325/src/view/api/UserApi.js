import { apiFail, apiSuccess, StringUtils } from '../../core';

export class UserApi {
  client;

  constructor(client) {
    this.client = client;
  }

  async login({ email, password }) {
    if (!StringUtils.isEmail(email)) {
      return apiFail('옳지 않은 이메일 형식입니다.');
    }

    const data = await this.client.post({
      url: '/api/user/login',
      data: { email, password },
    });

    if (!data.length) {
      return apiFail('이메일 또는 비밀번호를 확인하세요');
    }

    return apiSuccess(data[0]);
  }

  async signup({ signEmail, signPassword, signPasswordConfirm }) {
    if (!StringUtils.isEquals(signPassword, signPasswordConfirm)) {
      return apiFail('패스워드를 확인해주세요.');
    }

    if (!StringUtils.isEmail(signEmail)) {
      return apiFail('옳지 않은 이메일 형식입니다.');
    }

    const data = await this.client.post({
      url: '/api/user',
      data: {
        email: signEmail,
        password: signPassword,
        status: 0,
      },
    });

    return apiSuccess(data);
  }
}
