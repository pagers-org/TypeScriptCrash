declare module 'Fox' {
  type LoginDataType = {
    bookmark?: BookmarkDataType[];
    createdAt?: string;
    email: string;
    password: string;
    status?: number;
    updatedAt?: string;
    _id?: string;
  };

  type BookmarkDataType = {
    _id: string;
    url?: string;
  };
}
