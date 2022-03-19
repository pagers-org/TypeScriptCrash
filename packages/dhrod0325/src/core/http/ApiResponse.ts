export function apiResponse(result: boolean, message: string, data = {}) {
  return {
    result,
    message,
    data,
  };
}

export function apiSuccess(data = {}, message = 'success') {
  return apiResponse(true, message, data);
}

export function apiFail(message: string, data = {}) {
  return apiResponse(false, message, data);
}
