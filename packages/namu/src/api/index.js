export async function login(url, data) {
  const config = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
  };
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
}

export async function signup(url, data) {
  const config = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
  };
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
}

export async function getBookmarkList(url, data) {
  const config = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
  };
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
}

export async function addBookmark(url, data) {
  const config = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
  };
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
}

export async function removeBookmark(url, data) {
  const config = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
  };
  if (data) config.body = JSON.stringify(data);
  const response = await fetch(url, config);
  const parse = await response.json();
  return parse;
}
