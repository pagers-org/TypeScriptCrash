export const instance = (method, data = null) => {
  const config = {
    method: method,
    headers: new Headers({ 'content-type': 'application/json' }),
    body: data,
  };
  return config;
};
