import fetchAPI from "../utils/api";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type FetchPosts = () => Promise<Post[]>;

type FetchPostById = (id: string) => Promise<Post>;

export const fetchPosts: FetchPosts = () => fetchAPI(`${BASE_URL}/posts`);

export const fetchPostById: FetchPostById = (id) =>
  fetchAPI(`${BASE_URL}/posts/${id}`);
