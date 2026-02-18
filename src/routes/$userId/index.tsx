import { GalleryView } from '@features/gallery/gallery.view';
import { createFileRoute } from '@tanstack/react-router'
import {galleryStore} from "@/store/gallery.ts";

export const Route = createFileRoute("/$userId/")({
  loader: async ({params}) => await galleryStore.fetchGallery(Number(params.userId)),
  component: GalleryView,
});