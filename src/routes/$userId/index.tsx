import { userStore } from '@/store/user';
import { GalleryView } from '@features/gallery/gallery.view';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/$userId/")({
  loader: () => userStore.getUserPhotos(),
  component: GalleryView,
});