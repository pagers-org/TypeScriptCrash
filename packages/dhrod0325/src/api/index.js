const API_SERVER = 'http://localhost:3000';

async function request(url, data = {}, config = {
    method: 'POST',
    headers: new Headers({'content-type': 'application/json'}),
}) {
    config.body = JSON.stringify(data);

    const response = await fetch(`${API_SERVER}${url}`, config);

    return await response.json();
}

export async function login(data) {
    return request('/api/user/login', data);
}

export async function signup(data) {
    return request('/api/user', data);
}

export async function getBookmarkList(data) {
    return request('/api/user/bookmark', data);
}

export async function addBookmark(url, data) {
    return request(url, data);
}

export async function removeBookmark(url, data) {
    const config = {
        method: 'DELETE',
        headers: new Headers({'content-type': 'application/json'}),
    };
    if (data) config.body = JSON.stringify(data);

    const response = await fetch(url, config);
    return await response.json();
}
