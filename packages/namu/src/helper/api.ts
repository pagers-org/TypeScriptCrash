import { METHOD } from "../constant/api";

const getConfig = (method: string, data: object) => {
  return {
    method: method,
    headers: new Headers({ "content-type": "application/json" }),
    body: data && JSON.stringify(data),
  };
};

export const postAsync = async (url: string, data: object) => {
  const config = getConfig(METHOD.POST, data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
};

export const getAsync = async (url: string, data: object) => {
  const config = getConfig(METHOD.GET, data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
};

export const deleteAsync = async (url: string, data: object) => {
  const config = getConfig(METHOD.DELETE, data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
};
