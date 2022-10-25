import { useQuery, type QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchPosts, type Post } from "../services/posts";
import { getLoaderData, type Query } from "../utils/api";

const postsQuery: Query<Post[]> = {
  queryKey: ["posts", "all"],
  queryFn: fetchPosts,
};

export const loader = (queryClient: QueryClient) => () => {
  return getLoaderData(queryClient, postsQuery);
};

const Posts = () => {
  const { data: posts } = useQuery(postsQuery);
  console.log("POSTS:", posts);

  if (!posts) {
    return <Layout title="Posts">No posts yet!</Layout>;
  }

  return (
    <Layout title="Posts">
      {posts.map(({ id, userId, title, body }) => (
        <Link to={`/posts/${id}`} key={`${id}${userId}`}>
          <Card id={id} userId={userId} title={title} body={body} />
        </Link>
      ))}
    </Layout>
  );
};

export default Posts;
