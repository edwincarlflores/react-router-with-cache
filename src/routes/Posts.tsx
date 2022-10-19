import { useQuery, type QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import fetchAPI from "../utils/api";

const postsQuery = () => ({
  queryKey: ["posts", "all"],
  queryFn: () => fetchAPI("https://jsonplaceholder.typicode.com/posts"),
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
  const { data } = useQuery(postsQuery());
  console.log("POSTS:", data);

  return (
    <div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Posts;
