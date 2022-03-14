import { parseData } from "./common";

export async function login(url, data) {
  await parseData(url, data)

}

export async function signup(url, data) {
  await parseData(url, data);
}
