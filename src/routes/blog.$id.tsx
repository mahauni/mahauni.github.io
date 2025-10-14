/* eslint-disable react-hooks/rules-of-hooks */
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import ArticlesPage from "../../features/articles"

export const BlogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: () => {
    const { id } = BlogPostRoute.useParams()

    return (
      <>
        <ArticlesPage id={Number(id)} />
      </>
    )
  },
})
