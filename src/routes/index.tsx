import HomePage from "../../features/home-page";

import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <>
      <HomePage />
    </>
  );
}
