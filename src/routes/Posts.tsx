import { useQuery, type QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchPosts, type Post } from "../services/posts";

const postsQuery = () => ({
  queryKey: ["posts", "all"],
  queryFn: fetchPosts,
});

export const loader = (queryClient: QueryClient) => async () => {
  const { queryKey, queryFn } = postsQuery();

  // return (
  //   queryClient.getQueryData(queryKey) ?? // Retrieves data from cache
  //   (await queryClient.fetchQuery(queryKey, queryFn)) // Initiate a fetch if there are no data in the cache
  // );

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

const Posts = () => {
  const { data: posts } = useQuery(postsQuery());
  console.log("POSTS:", posts);

  return (
    <Layout title="Posts">
      {posts?.map(({ id, userId, title, body }) => (
        <Link to={`/posts/${id}`} key={`${id}${userId}`}>
          <Card id={id} userId={userId} title={title} body={body} />
        </Link>
      ))}
    </Layout>
  );
};

export default Posts;
