import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Photo, UserPhoto } from "@/types/Photo";

const { localStorage } = globalThis;

export function getPhotoById(photoId: Photo["id"]): Photo {
  const photosJson = localStorage.getItem(LOCAL_STORAGE_KEYS.PHOTOS);
  if (!photosJson) {
    throw new Error("Images not found in storage");
  }
  const photos = JSON.parse(photosJson);

  const photo = photos.data.find((photo: Photo) => photoId === photo.id);

  if (!photo) {
    throw new Error("Error fetching photo details");
  }

  return photo;
}

export function updateGallery(gallery: UserPhoto[]) {
  const userInfo = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_USER);

  if (!userInfo) {
    throw new Error("User not found in storage");
  }
  const user = JSON.parse(userInfo);

  user.photos = gallery;

  localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_USER, JSON.stringify(user));
}
