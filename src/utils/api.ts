import type {
  QueryClient,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";

export const fetchAPI = async (url = "", config?: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...(config || {}),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export type Query<TData> = UseQueryOptions<TData, unknown, TData, QueryKey>;

export const getLoaderData = async <TData>(
  queryClient: QueryClient,
  query: Query<TData>
) => {
  const { queryKey, queryFn } = query;

  if (!queryKey) {
    throw new Error("Missing Query Key");
  }

  if (!queryFn) {
    throw new Error("Missing Query Function");
  }

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
