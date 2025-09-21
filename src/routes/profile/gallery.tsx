import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "../../features/gallery/Gallery";

export const Route = createFileRoute("/profile/gallery")({
  component: Gallery,
});

