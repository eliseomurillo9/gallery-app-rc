import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/profile/gallery"!</div>;
}
