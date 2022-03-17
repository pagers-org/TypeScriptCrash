export class ApiResponse {
  constructor(result, message, data = {}) {
    this.result = result;
    this.message = message;
    this.data = data;
  }

  static fail(message, data = {}) {
    return new ApiResponse(false, message, data);
  }

  static success(data = {}, message = 'success') {
    return new ApiResponse(true, message, data);
  }
}
