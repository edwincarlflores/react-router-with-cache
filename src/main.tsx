import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import Error from "./components/Error";
import Posts, { loader as postsLoader } from "./routes/Posts";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 1000 ms = 1 sec * 10 = 10 secs
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "posts",
    element: <Posts />,
    errorElement: <Error />,
    loader: postsLoader(queryClient),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
