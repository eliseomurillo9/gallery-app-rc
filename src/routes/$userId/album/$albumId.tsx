
import { AlbumGalleryView } from "@features/albums/gallery.view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$userId/album/$albumId")({
  component: AlbumGalleryView,
});
