import { createFileRoute } from "@tanstack/react-router";
import { GalleryView } from "@features/gallery/gallery.view.tsx";
import {galleryStore} from "@/store/gallery.ts";
import {userStore} from "@/store/user.ts";

export const Route = createFileRoute("/profile/gallery")({
  component: GalleryView,
  loader: async () =>{
    const user = userStore.getUser();

    await galleryStore.fetchGallery(user.id);
  }
});
