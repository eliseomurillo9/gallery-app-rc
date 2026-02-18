import { createFileRoute } from "@tanstack/react-router";
import { GalleryView } from "@features/gallery/gallery.view";
import {galleryStore} from "@/store/gallery.ts";

export const Route = createFileRoute("/$userId/profile/gallery")({
  component: GalleryView,
  loader: async ({params}) => await galleryStore.fetchGallery(Number(params.userId)),
});
