import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style.css";
import App from "./routes";
import { I18nextProvider } from "react-i18next";
import { configure, InMemory } from '@zenfs/core';

import i18n from "../i18n/index.ts";
import "../i18n";

await configure({
  mounts: {
    '/blog': InMemory,
    '/': InMemory,
  },
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
