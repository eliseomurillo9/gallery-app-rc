import { createFileRoute } from "@tanstack/react-router";
import { GalleryView } from "@features/gallery/gallery.view";
import { getPhotos } from "@services/galleryService";

export const Route = createFileRoute("/$userId/profile/gallery")({
  component: GalleryView,
  loader: async () => await getPhotos(),
});
