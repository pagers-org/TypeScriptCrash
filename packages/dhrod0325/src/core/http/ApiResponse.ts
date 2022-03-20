import { ApiResponse } from '@/core';

export function apiResponse(
  result: boolean,
  message: string,
  data = {},
): ApiResponse {
  return {
    result,
    message,
    data,
  };
}

export function apiSuccess(data = {}, message = 'success'): ApiResponse {
  return apiResponse(true, message, data);
}

export function apiFail(message: string, data = {}): ApiResponse {
  return apiResponse(false, message, data);
}
