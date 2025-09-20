import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style.css";
import { I18nextProvider } from "react-i18next";
import { configure, InMemory } from '@zenfs/core';
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import i18n from "../i18n/index.ts";
import "../i18n";

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
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


const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </StrictMode>,
  )
}

