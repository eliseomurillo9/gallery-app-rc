import { createFileRoute } from "@tanstack/react-router";
import { userStore } from "@/store/user";
import { GalleryView } from "@features/gallery/gallery.view";

export const Route = createFileRoute("/$userId/profile/gallery")({
  component: GalleryView,
  loader: () => userStore.getUserPhotos(),
});
