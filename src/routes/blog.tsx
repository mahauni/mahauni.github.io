import { createRoute } from "@tanstack/react-router";
import BlogPage from "../../features/blog";
import { rootRoute } from "./__root";

export const BlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <>
      <BlogPage />
    </>
  ),
})
