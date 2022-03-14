import { parseData } from "./common";

export async function login(url, data) {
  return await parseData(url, data);
}

export async function signup(url, data) {
  return await parseData(url, data);
}
