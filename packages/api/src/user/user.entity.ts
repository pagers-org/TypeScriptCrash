export interface LibraryEntity {
  _id: string;
  url: string;
}

export interface UserEntity {
  _id: string;
  email: string;
  password: string;
  bookmark: LibraryEntity[];
  status: number;
  createdAt: number;
}
