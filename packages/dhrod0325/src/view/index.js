import { API_SERVER } from './constant/Constant';

import { HttpClient, LocalStorage, Storage } from '../core';

import { BookmarkApi } from './api/BookmarkApi';
import { UserApi } from './api/UserApi';

export * from './components/PinItem';
export * from './components/LoadingProgress';
export * from './components/LoginForm';
export * from './components/PinList';
export * from './components/PinNav';
export * from './constant/Constant';
export * from './model/User';

const client = new HttpClient({ baseUrl: API_SERVER });

const bookMarkApi = new BookmarkApi(client);
const userApi = new UserApi(client);

const storage = new Storage(new LocalStorage());

export { bookMarkApi, userApi, storage };
