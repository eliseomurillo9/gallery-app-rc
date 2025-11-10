import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "../../features/gallery/Gallery";
import { userStore } from "../../store/user";

export const Route = createFileRoute('/$userId/gallery')({
  loader: () => userStore.getUserPhotos(),
  component: Gallery,
})