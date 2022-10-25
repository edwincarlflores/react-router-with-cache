import { useQuery, type QueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchPostById, type Post as TPost } from "../services/posts";
import { getLoaderData, type Query } from "../utils/api";

const postQuery = (postId: string): Query<TPost> => ({
  queryKey: ["post", postId],
  queryFn: () => fetchPostById(postId),
});

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: any) => {
    return getLoaderData(queryClient, postQuery(params.postId));
  };

const Post = () => {
  const { postId } = useParams();

  if (!postId) {
    return <Layout>Missing Post ID</Layout>;
  }

  const { data: post } = useQuery(postQuery(postId));

  if (!post) {
    return <Layout>Missing Post</Layout>;
  }

  const { id, userId, title, body } = post;

  return (
    <Layout title="Post">
      <Card id={id} userId={userId} title={title} body={body} />
    </Layout>
  );
};

export default Post;
