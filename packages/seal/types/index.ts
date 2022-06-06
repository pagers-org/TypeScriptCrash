export type Menu = 'explore' | 'saved';

export type Feeds = {
	id: number;
	imageUrl: string;
};

export interface UserBasicForm {
	email: string;
	password: string;
}
