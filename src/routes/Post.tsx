import { useQuery, type QueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchPostById } from "../services/posts";

const postQuery = (postId: string) => ({
  queryKey: ["post", postId],
  queryFn: () => fetchPostById(postId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    console.log("PARAMS", params);
    const { queryKey, queryFn } = postQuery(params.postId);

    // Retrieve data from the cache
    const cachedData = queryClient.getQueryData(queryKey);

    // Return the data from the cache if it exists
    if (cachedData) {
      console.log("Loading data from cache...");
      return cachedData;
    }

    // Initiate a fetch if there are no data in the cache
    console.log("Initiating fetch...");
    return await queryClient.fetchQuery(queryKey, queryFn);
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
