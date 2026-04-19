import { GalleryView } from '@features/gallery/gallery.view';
import { createFileRoute } from '@tanstack/react-router'
import {galleryStore} from "@/store/gallery.ts";
import {userStore} from "@/store/user.ts";

export const Route = createFileRoute("/")({
  loader: async () => {
    const user = userStore.getUser();
    await galleryStore.fetchGallery(Number(user.id));
  },
  component: GalleryView,
});