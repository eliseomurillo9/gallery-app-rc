import { Gallery } from "@shared/UI/Gallery/Gallery";
import { useGalleryStore } from "@/store/hooks/useUserStore.ts";
import {galleryStore} from "@/store/gallery.ts";
import type {Photo} from "@/types/Photo.ts";
import {userStore} from "@/store/user.ts";

const user = userStore.getUser()
export function GalleryView() {
  const photos = useGalleryStore();
  if (!photos) return null; // or a loading UI

const deletePhoto = (photoId: Photo['id']) => galleryStore.deletePhoto(user.id, photoId);
  return photos && photos.length !== 0 && <Gallery photos={photos} onPhotoDelete={deletePhoto}/>;
}