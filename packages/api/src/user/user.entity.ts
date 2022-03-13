export interface LibraryEntity {
  _id: string;
  url: string;
}

export interface UserEntity {
  _id: string;
  email: string;
  password: string;
  name: string;
  blogURL: string;
  githubURL: string;
  profileImage: any;
  bookmark: LibraryEntity[];
  status: number;
  createdAt: number;
}
