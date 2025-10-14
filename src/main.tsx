import { StrictMode } from "react";
import "./assets/style.css";
import { I18nextProvider } from "react-i18next";
import { createRoot } from "react-dom/client";
import { configure, InMemory } from '@zenfs/core';
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'

import i18n from "../i18n/index.ts";
import "../i18n";

import { rootRoute } from "./routes/__root"
import { IndexRoute } from "./routes/index"
import { BlogRoute } from "./routes/blog"
import { BlogPostRoute } from "./routes/blog.$id"

const hashHistory = createHashHistory()

const routeTree = rootRoute.addChildren([IndexRoute, BlogRoute, BlogPostRoute])

const router = createRouter({
  routeTree,
  history: hashHistory,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

await configure({
  mounts: {
    '/blog': InMemory,
    '/': InMemory,
  },
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>
)
