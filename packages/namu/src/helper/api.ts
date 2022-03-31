import { METHOD } from "../constant/api";

export async function postAsync(url: string, data: object) {
  return getParsedData(url, getConfig(METHOD.POST, data));
}

export async function getAsync(url: string, data: object) {
  return getParsedData(url, getConfig(METHOD.GET, data));
}

export async function deleteAsync(url: string, data: object) {
  return getParsedData(url, getConfig(METHOD.DELETE, data));
}

function getConfig(method: string, data: object) {
  return {
    method: method,
    headers: new Headers({ "content-type": "application/json" }),
    body: data && JSON.stringify(data),
  };
}

async function getParsedData(url: string, config: object) {
  const response = await fetch(url, config);
  return await response.json();
}
