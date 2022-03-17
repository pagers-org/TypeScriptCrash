export function apiResponse(result, message, data = {}) {
  return {
    result,
    message,
    data,
  };
}

export function apiSuccess(data = {}, message) {
  return apiResponse(true, message, data);
}

export function apiFail(message, data = {}) {
  return apiResponse(false, message, data);
}
