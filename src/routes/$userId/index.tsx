import { GalleryView } from '@features/gallery/gallery.view';
import { getPhotos } from '@services/galleryService';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/$userId/")({
  loader: async () => await getPhotos(),
  component: GalleryView,
});