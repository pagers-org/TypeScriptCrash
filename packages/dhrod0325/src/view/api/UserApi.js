import { Validator, ApiResponse } from '../../core';

export class UserApi {
  client;

  constructor(client) {
    this.client = client;
  }

  async login({ email, password }) {
    if (!Validator.isValidEmail(email)) {
      return ApiResponse.fail('옳지 않은 이메일 형식입니다.');
    }

    const data = await this.client.post({
      url: '/api/user/login',
      data: { email, password },
    });

    if (!data.length) {
      return ApiResponse.fail('이메일 또는 비밀번호를 확인하세요');
    }

    return ApiResponse.success(data[0]);
  }

  async signup({ signEmail, signPassword, signPasswordConfirm }) {
    if (!Validator.isValidPassword(signPassword, signPasswordConfirm)) {
      return ApiResponse.fail('패스워드를 확인해주세요.');
    }

    if (!Validator.isValidEmail(signEmail)) {
      return ApiResponse.fail('옳지 않은 이메일 형식입니다.');
    }

    const data = await this.client.post({
      url: '/api/user',
      data: {
        email: signEmail,
        password: signPassword,
        status: 0,
      },
    });

    return ApiResponse.success(data);
  }
}
