import { fetchAPI } from "../utils/api";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = (): Promise<Post[]> => fetchAPI(`${BASE_URL}/posts`);

export const fetchPostById = (id: string): Promise<Post> =>
  fetchAPI(`${BASE_URL}/posts/${id}`);
