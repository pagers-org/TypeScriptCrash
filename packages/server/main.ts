import express from 'express';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';

const API = '/api/user';

const app = express();
app.use(express.json());

const userService = new UserService(new UserRepository());

app.post(`${API}`, async ({ body }, res) => {
  res.json(await userService.save(body));
});

app.post(`${API}/login`, async ({ body }, res) => {
  res.json(await userService.findUser(body));
});

app.post(`${API}/bookmark`, async ({ body }, res) => {
  res.json(await userService.findBookmark(body));
});

app.post(`${API}/bookmark/:url`, async ({ params: { url }, body }, res) => {
  res.json(await userService.add(body, url));
});

app.delete(`${API}/bookmark/:url`, async ({ params: { url }, body }, res) => {
  res.json(await userService.remove(body, url));
});

export const handler = app;
