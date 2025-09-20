import BlogPage from "../../features/blog";

import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/blog")({
  component: Blog,
})

function Blog() {
  return (
    <>
      <BlogPage />
    </>
  );
}
