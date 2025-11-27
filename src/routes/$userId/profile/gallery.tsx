import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "../../../features/gallery/Gallery";

export const Route = createFileRoute("/$userId/profile/gallery")({
  component: Gallery,
});

