import HomePage from "../../features/home-page";

import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root";

export const IndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <HomePage />
    </>
  ),
})

